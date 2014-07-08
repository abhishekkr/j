/* $ minimal which I mostly require; so gotta go jq */

/* $DOM: just a css selector */
function $DOM(elementHint, elementIndex){
  /* // in case non-css selector gets required 
  var first_char = elementHint.match(/^./)[0];
	var rest_chars = elementHint.replace(/^./, ''); */
    	
  var str_nodes = document.querySelectorAll(elementHint);
  if (elementIndex === undefined) {
    elementIndex = 0;
  }
	return str_nodes[elementIndex];
}
