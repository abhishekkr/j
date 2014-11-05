
/*
 * parseINI(string_from_INI_Config_file)
 * returns a dictionary with all non-section elements,  Sectio as elements with value of dictionary of it's elements
 *
 * parseINIHiera(string_from_INI_Config_file)
 * does parseINI, then propagates all parent section attribs to child and inject all child sections to parent
 *
 * For sample usage refer: tests/tests_j_ini.js
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
  var _obj = Object;
  _obj = INI.value;
  if(INI.hasOwnProperty("section")){
    _obj = _obj[INI.section];
  }
  if(INI.hasOwnProperty("trueParam")){
    _obj = _obj[INI.trueParam];
  }
  _obj[key] = val;
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
    for(var defaultChildAttrib in INI.value[parent_section][child_section]){
      if(INI.value[child_section].hasOwnProperty(defaultChildAttrib)) continue;
      _default_child_attrib = INI.value[parent_section][child_section][defaultChildAttrib]

      for(var _child in INI.value[child_section]){
        if(INI.value[child_section][_child].hasOwnProperty(defaultChildAttrib)) continue;
        INI.value[child_section][_child][defaultChildAttrib] = _default_child_attrib
      }
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

