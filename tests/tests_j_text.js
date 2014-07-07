// testing ../j_text.js

function TestTrim(data, expectedValue){
	var resultValue = trim(data);
	QUnit.test("Trim for " + data, function( assert ) {
  		assert.equal( resultValue, expectedValue);
	});
}

TestTrim(" n/a", "n/a");
TestTrim(" n/a ", "n/a");
TestTrim(" n/a   \n", "n/a");
TestTrim(" n / a", "n / a");
TestTrim("n/a", "n/a");