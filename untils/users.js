var fs = require('fs');
var classMap = {
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
fs.readFile('./users', 'utf-8', function(err, data) {
	if (err) {
		console.log(err);
	} else {
		var lines = data.split('\n');
		for (var i = 0; i < lines.length; i++) {
			var newLine = "{\"" + lines[i].substring(lines[i].indexOf("agent"));
			var jsonLine = JSON.parse(newLine);
			console.log(jsonLine.agent);
			if (jsonLine.agent.indexOf("Intel Mac OS X")>-1) {
				classMap["Mac"]++;
			} else if (jsonLine.agent.indexOf("iPhone OS")>-1) {
				classMap["iPhone"]++;
			} else if (jsonLine.agent.indexOf("m2 note")>-1) {
				classMap["小米note2"]++;
			} else if (jsonLine.agent.indexOf("M5 Note")>-1) {
				classMap["魅族note5"]++;
			} else if (jsonLine.agent.indexOf("ZUK Z2131")>-1) {
				classMap["联想ZUKZ21"]++;
			} else if (jsonLine.agent.indexOf("Redmi Note 3")>-1) {
				classMap["红米note3"]++;
			} else if (jsonLine.agent.indexOf("MI NOTE Pro")>-1) {
				classMap["小米notepro"]++;
			} else if (jsonLine.agent.indexOf("MI 2")>-1) {
				classMap["小米2"]++;
			} else if (jsonLine.agent.indexOf("MI 5s")>-1) {
				classMap["小米5s"]++;
			} else if (jsonLine.agent.indexOf("HUAWEI")>-1) {
				classMap["华为"]++;
			} else {
				classMap["not"]++;
			}

		}
		console.log(JSON.stringify(classMap));
	}
})

