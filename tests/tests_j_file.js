// testing ../j_file.js

function TestLoadURI(href, expectedValue){
	var resultValue = loadURI(href);
	QUnit.test("LoadURI for " + href, function(assert) {
  		assert.equal(resultValue, expectedValue);
	});
}

TestLoadURI("./README.md", "### Tests for the J-LIB");
TestLoadURI("./NOFILE.md", "");
