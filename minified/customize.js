/*Customizer*/
var minified = "";

function jlibUpdate(jlib){
	j = loadURI(jlib.value);
	if (jlib.checked) {
		minified = minified + j;
		jlib.parentNode.style.color = "#2f2f2f";
	} else {
		minified = minified.replace(j, "");
		jlib.parentNode.style.color = "#5f5f5f";
	}
	$DOM("#jlibMinified textarea").innerHTML = minified;
}