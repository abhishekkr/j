// testing ../j_ini.js

function TestParseINI(iniData, expectedValue, notValue){
	var resultValue = parseINI(iniData);
  QUnit.test("parseINI($iniData) for: " + String(iniData), function( assert ) {
      assert.deepEqual(resultValue, expectedValue);
	});
  QUnit.test("parseINI($iniData) for: " + String(iniData), function( assert ) {
      assert.notDeepEqual(resultValue, notValue);
	});
}

function TestParseINIHiera(iniData, expectedValue, notValue){
	var resultValue = parseINIHiera(iniData);
  QUnit.test("parseINIhiera($iniData) for: " + String(iniData), function( assert ) {
      assert.deepEqual(resultValue, expectedValue);
	});
  QUnit.test("parseINIhiera($iniData) for: " + String(iniData), function( assert ) {
      assert.notDeepEqual(resultValue, notValue);
	});
}

//base data
var ini_data01 = "firstname=john\nlastname=doe";
var ini_data01_notresult = {"firstname":"john"};

var ini_data02 = "[names]\nfirstname=john\nlastname=doe\n";
var ini_data02_notresult = {"firstname":"john", "lastname":"doe"};

var ini_data03 = "[names]\nJohnDoe\n\n[JohnDoe]\nfirstname=john\nlastname=doe";
var ini_data03_notresult = {"firstname":"john"};

var ini_data04 = "[names]\nJohnDoe uuid=jd\n\n[JohnDoe]\nfirstname=john\nlastname=doe";
var ini_data04_notresult = {"firstname":"john"};


// non hierarchical data
var ini_data01_result = {"firstname":"john", "lastname":"doe"};
var ini_data02_result = {"names": {"firstname":"john", "lastname":"doe"}};
var ini_data03_result = {"names": {"JohnDoe": {}}, "JohnDoe": {"firstname":"john", "lastname":"doe"}};
var ini_data04_result = {"names": {"JohnDoe": {"uuid":"jd"}}, "JohnDoe": {"firstname":"john", "lastname":"doe"}};

TestParseINI(ini_data01 ,ini_data01_result, ini_data01_notresult);
TestParseINI(ini_data02 ,ini_data02_result, ini_data02_notresult);
TestParseINI(ini_data03 ,ini_data03_result, ini_data03_notresult);
TestParseINI(ini_data04 ,ini_data04_result, ini_data04_notresult);

// hierarchical INI data
var ini_data01_hiera = {"firstname":"john", "lastname":"doe"};
var ini_data02_hiera = {"names": {"firstname":"john", "lastname":"doe"}};
var ini_data03_hiera = {"names": {"JohnDoe": {"firstname":"john", "lastname":"doe"}}, "JohnDoe": {"firstname":"john", "lastname":"doe"}};
var ini_data04_hiera = {"names": {"JohnDoe": {"firstname":"john", "lastname":"doe", "uuid":"jd"}}, "JohnDoe": {"firstname":"john", "lastname":"doe", "uuid":"jd"}};

TestParseINIHiera(ini_data01, ini_data01_hiera, ini_data01_notresult);
TestParseINIHiera(ini_data02, ini_data02_hiera, ini_data02_notresult);
TestParseINIHiera(ini_data03, ini_data03_hiera, ini_data03_notresult);
TestParseINIHiera(ini_data04, ini_data04_hiera, ini_data04_notresult);
