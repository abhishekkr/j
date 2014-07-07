/* text related minimal which I mostly require; so gotta go jq */

/* trim: strings l-r spaces */
function trim(str){
  return str.replace(/(^\s+|\s+$)/g, '')
}
