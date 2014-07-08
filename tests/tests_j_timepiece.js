// testing ../j_timepiece.js

function TestDelay(milliseconds){
	var _start, _stop, resultValue;
	_start = new Date().getTime();
	delay(milliseconds);
	_stop = new Date().getTime();
	resultValue = _stop - _start - 1;
	QUnit.test("Delay for " + milliseconds, function( assert ) {
  		assert.ok( resultValue >= milliseconds); // sometimes it gets hold in few late milliseconds
	});
}

TestDelay(10);