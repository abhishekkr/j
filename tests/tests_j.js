// testing ../j.js

function TestDOMWithoutIndex(elementHint, expectedValue){
	var resultValue;
	resultValue = trim($DOM(elementHint).innerHTML);
	QUnit.test("$DOM for " + elementHint, function( assert ) {
  		assert.equal( resultValue, expectedValue);
	});
}

function TestDOMWithIndex(elementHint, elementIndex, expectedValue){
	var resultValue;
	resultValue = trim($DOM(elementHint, elementIndex).innerHTML);
	QUnit.test("$DOM for " + elementHint + " at " + elementIndex, function( assert ) {
  		assert.equal( resultValue, expectedValue);
	});
}

//without index
TestDOMWithoutIndex("#banner", "Sample001"); //id
TestDOMWithoutIndex(".testlist", "n/a"); //class
TestDOMWithoutIndex("b", "Check it out."); //tagname
TestDOMWithoutIndex("div[name=testr01]", "testr01 testing name"); //property
//with index
TestDOMWithIndex("#banner", 0, "Sample001"); //id
TestDOMWithIndex(".testlist", 1, "nil"); //class
TestDOMWithIndex("b", 1, "Don't Check."); //tagname
TestDOMWithIndex("div[name=testr01]", 2, "testr01 testing name once again"); //property
