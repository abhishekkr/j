
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
  if(section){
    if(INI.hasOwnProperty("trueParam")){
      INI.value[section][INI.trueParam][key] = val;
    } else{
      INI.value[section][key] = val;
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
    //console.log("trueParam:", token, ", under:", section);
    var match = token.match(INIRegex.trueParam);
    if(section){
      INI.value[section][match[1]] = {};
    }else{
      INI.value[match[1]] = {};
    }
    INI.trueParam = match[1];

  }else if(INIRegex.param.test(token)){
    //console.log("param:", token, ", under:", section);
    var match = token.match(INIRegex.param);
    populateValueWithToken(INI, match[1], match[2])
  }
}

/* parse line from INI */
function parseINILine(INI, line){
  if(INIRegex.comment.test(line)){
    //console.log("comment:", line);
    return;

  }else if(INIRegex.section.test(line)){
    //console.log("section:", line);
    var match = line.match(INIRegex.section);
    INI.value[match[1]] = {};
    section = match[1];

  }else if(line.length == 0 && section){
    //console.log("section-null:", line);
    section = null;

  }else {
    tokens = line.split(/\s+/)
    for(token_idx=0; token_idx<tokens.length; token_idx++){
      parseINIToken(INI, tokens[token_idx])
    }
    delete INI.trueParam;
  };
}

/* parse INI configuration files, support Ansible style INI extended formats */
function parseINI(data){
  var INI = {value: {}};
  var lines = data.split(/\r\n|\r|\n/);
  var section = null;

  for(line_idx=0; line_idx<lines.length; line_idx++){
    parseINILine(INI, lines[line_idx])
  }

  return INI.value;
}

