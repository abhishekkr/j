/* path related minimal which I mostly require; so gotta go jq */

/* loadURI: load responseText off any URI */
function loadURI(href){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}