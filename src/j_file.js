/* path related minimal which I mostly require; so gotta go jq */

/* loadURI: load responseText off any URI */
function loadURI(href){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    var stateX = parseInt(xmlhttp.status / 100);
    if(stateX == 4 || stateX == 5){
      return "";
    }
    return xmlhttp.responseText;
}
