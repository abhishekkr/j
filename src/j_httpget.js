/* utilizing HTTP GET method passed key=var params; so gotta go jq */

/* getUrlVars: returns dictionary of key:val from HTTP GET params */
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}
