/* time related minimal which I mostly require; so gotta go jq */

/* delay: loop in nothingness for given milliseconds */
function delay(milliseconds) {
    var _start = new Date().getTime();
 
    for (;;) {
        var _now = new Date().getTime();
        if ((_now - _start) > milliseconds){
            break;
        }
    }
}
