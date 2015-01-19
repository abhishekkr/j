// testing ../j_httpget.js

function TestGetUrlVars(){
	var resultValue = getUrlVars();
  var getKeyValPart = window.location.href.replace(/.*\?/, '');
	QUnit.test("getUrlVars for " + getKeyValPart, function(assert) {
      if(getKeyValPart == window.location.href){
        assert.equal(0, Object.keys(resultValue).length);
      } else {
        assert.equal(getKeyValPart.split("&").length, Object.keys(resultValue).length);
      }
	});
}

TestGetUrlVars();
