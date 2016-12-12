var fs = require("fs");
var map = {
	"1": "休闲益智",
	"2": "体育竞技",
	"3": "儿童游戏",
	"4": "动作冒险",
	"5": "棋牌天地",
	"6": "经营策略",
	"7": "网络游戏",
	"8": "角色扮演",
	"9": "飞行射击"
};
fs.readFile('./edges', 'utf-8', function(err, data) {
	if (err) {
		console.log(err);
	} else {
		var lines = data.split("\n");
		for (var i = 0; i < lines.length; i++) {
			var arr = lines[i].split("\t");
			
			var c = arr[2].split("/");
			for (var j = 0; j < c.length; j++) {
				// console.log(c[j]);
				if (c[j] > 0) {
					var s = {
						"sourceID": arr[1],
						"attributes": {},
						"targetID": map[j+1],
						"size": 1
					}
					console.log(s);
				}

			}

		}

	}
})