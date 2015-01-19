/*Customizer*/
var minified = "";

var j_map = {
				"./j.min.js": "DOM",
				"./j_text.min.js": "Text",
				"./j_file.min.js": "XHR",
				"./j_timepiece.min.js": "Time",
				"./j_ini.min.js": "INI Config Deserializer",
				"./j_httpget.min.js": "HTTPGet Key:Val params"
			}

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
