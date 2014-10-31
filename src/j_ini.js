
/*
 * parseINI(string_from_INI_Config_file)
 * returns a dictionary with all non-section elements,  Sectio as elements with value of dictionary of it's elements
 * Sample Usage:
 *   var iniData = "[some]\nthing  ansible_ssh_user=user01\nvars ansible_connection=local ansible_ssh_user=user01\n\n[ome]\nabc=ABC\n\nm=e";
 *   var ini = parseINI(iniData);
 *   console.log(ini);
 * would give something like:
 *   {
 *     "some": {
 *       "thing": {
 *         "ansible_ssh_user": "user01"
 *       },
 *       "vars": {
 *         "ansible_connection": "local",
 *         "ansible_ssh_user": "user01"
 *       }
 *     },
 *
 *     "ome": {
 *       "abc": "ABC"
 *     },
 *
 *     "m": "e"
 *   }
*/

/* regex for INI tokens */
var INIRegex = {
    section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
    trueParam: /^\s*([\w\.\-\_]+)\s*$/,
    param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
    comment: /^\s*;.*$/
};

/* populate value depending on trueParam or not */
function populateValueWithToken(INI, key, val){
  if(INI.hasOwnProperty("section")){
    if(INI.hasOwnProperty("trueParam")){
      INI.value[INI.section][INI.trueParam][key] = val;
    } else{
      INI.value[INI.section][key] = val;
    }

  }else{
    if(INI.hasOwnProperty("trueParam")){
      INI.value[INI.trueParam][key] = val;
    } else{
      INI.value[key] = val;
    }

  }
}

/* parse token from line in INI */
function parseINIToken(INI, token){
  if(INIRegex.trueParam.test(token)){
    var match = token.match(INIRegex.trueParam);
    if(INI.hasOwnProperty("section")){
      INI.value[INI.section][match[1]] = {};
    }else{
      INI.value[match[1]] = {};
    }
    INI.trueParam = match[1];

  }else if(INIRegex.param.test(token)){
    var match = token.match(INIRegex.param);
    populateValueWithToken(INI, match[1], match[2])
  }
}

/* parse line from INI */
function parseINILine(INI, line){
  if(INIRegex.comment.test(line)){
    return;

  }else if(INIRegex.section.test(line)){
    var match = line.match(INIRegex.section);
    INI.value[match[1]] = {};
    INI.section = match[1];

  }else if(line.length == 0 && INI.hasOwnProperty("section")){
    delete INI.section;

  }else {
    var tokens = line.split(/\s+/);
    for(var token_idx in tokens){
      parseINIToken(INI, tokens[token_idx]);
    }
    delete INI.trueParam;
  };
}

/* parse INI configuration files, support Ansible style INI extended formats */
function parseINI(data){
  var INI = {value: {}};
  var lines = data.split(/\r\n|\r|\n/);

  for(var line_idx in lines){
    parseINILine(INI, lines[line_idx]);
  }
  return INI.value;
}

/* for parseINIhiera, updateINIParents call updateINIChildren to propagate extra attributes */
function updateINIChildren(INI, parent_section, child_section){
    for(var defaultChild in INI.value[parent_section][child_section]){
      if(INI.value[child_section].hasOwnProperty(defaultChild)) continue;
      INI.value[child_section][defaultChild] = INI.value[parent_section][child_section][defaultChild]
    }
}

/* update parseINI output to map child section under parent section */
function updateINIParents(INI, section_name){
  for(var _section in INI.value){
    if(section_name == _section) continue;

    if(typeof(INI.value[_section]) == 'string') continue;

    if(Object.keys(INI.value[_section]).indexOf(section_name) < 0) continue;

    updateINIChildren(INI, _section, section_name)

    INI.value[_section][section_name] = (INI.value[section_name]);
  }
}

/* parse INI data with parent section having info about child section */
function parseINIHiera(data){
  var INI = {value: parseINI(data)};
	for(var _section in INI.value){
    updateINIParents(INI, _section);
	}
	return INI.value;
}

