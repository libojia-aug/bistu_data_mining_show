var fs = require('fs');
var _classMap = {
	"Mac": 0,
	"iPhone": 0,
	"小米note2": 0,
	"魅族note5": 0,
	"联想ZUKZ21": 0,
	"红米note3": 0,
	"小米notepro": 0,
	"小米2": 0,
	"小米5s": 0,
	"华为": 0,
	"not": 0
};
var _ip = [];
var _ipU = [];

function read(file, action) {
	fs.readFile(file, 'utf-8', function(err, data) {
		if (err) {
			console.log(err);
		} else {
			var lines = data.split('\n');
			return action(lines);
		}
	})
}

function uaAction(lines) {
	for (var i = 0; i < lines.length; i++) {
		var newLine = "{\"" + lines[i].substring(lines[i].indexOf("agent"));
		var jsonLine = JSON.parse(newLine);
		getDevice(jsonLine.agent);
		_ip.push(jsonLine.ip.substring(7));
	}
	console.log(JSON.stringify(_classMap));
	_ipU = arrayUnique(_ip);
	forArr(_ipU, 100000000, "被采集用户");
}

function ipTopAction(lines) {
	for (var i = 0; i < lines.length; i++) {
		var ls = lines[i].split("\t");
		arrayIP(ls[0], Number(ls[1]) * 10000, "全校用户");
	}
}

function forArr(arr, s, g) {
	for (var i = 0; i < arr.length; i++) {
		arrayIP(arr[i], s, g);
	}
}

function arrayUnique(arr) {
	//var myArray=new Array("a","a","c","a","c","d","e","f","f","g","h","g","h","k");  
	var arrTemp = arr;
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr.length; j++) {
			temp = arr[i];
			if ((i + j + 1) < arr.length && temp == arr[i + j + 1]) //如果当前元素与后一个元素相等  
				arrTemp.splice(i + j + 1, 1); //然后就移除下一个元素   
		}
	}
	return arrTemp;
}

function getDevice(agent) {
	if (agent.indexOf("Intel Mac OS X") > -1) {
		_classMap["Mac"]++;
	} else if (agent.indexOf("iPhone OS") > -1) {
		_classMap["iPhone"]++;
	} else if (agent.indexOf("m2 note") > -1) {
		_classMap["小米note2"]++;
	} else if (agent.indexOf("M5 Note") > -1) {
		_classMap["魅族note5"]++;
	} else if (agent.indexOf("ZUK Z2131") > -1) {
		_classMap["联想ZUKZ21"]++;
	} else if (agent.indexOf("Redmi Note 3") > -1) {
		_classMap["红米note3"]++;
	} else if (agent.indexOf("MI NOTE Pro") > -1) {
		_classMap["小米notepro"]++;
	} else if (agent.indexOf("MI 2") > -1) {
		_classMap["小米2"]++;
	} else if (agent.indexOf("MI 5s") > -1) {
		_classMap["小米5s"]++;
	} else if (agent.indexOf("HUAWEI") > -1) {
		_classMap["华为"]++;
	} else {
		_classMap["not"]++;
	}
}

function arrayIP(arr, s, g) {
	var ps = arr.split(".");
	var arrTemp = [];
	arrTemp.push(Number(ps[0]) * 1000 + Number(ps[1]) * 1000);
	arrTemp.push(Number(ps[2]) * 1000 + Number(ps[3]));
	arrTemp.push(s);
	arrTemp.push(arr);
	arrTemp.push(g);
	console.log(arrTemp);
}
read('./users', uaAction);
// read('./allSchoolIPTop300', ipTopAction);