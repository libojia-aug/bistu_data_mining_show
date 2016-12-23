var path = require("path");
var fs = require("fs");

var settings = require("../settings");
var User = require("../models/user");

var errorLog = fs.createWriteStream(path.join(".", settings.logFolder, settings.errorLog), {
  flags: "r+"
});
var dbLog = fs.createWriteStream(path.join(".", settings.logFolder, settings.dbLog), {
  flags: "r+"
});

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

module.exports = function(app) {
  app.get("/", function(req, res) {
    if (!req.session.isNewGet) {
      var newUser = new User({
        agent: req.headers["user-agent"],
        language: req.headers["accept-language"],
        ip: getClientIP(req),
        cookies: req.cookies
      });
      newUser.save(function(err, user) {
        console.log(user);
        writeLog(req, err, user);
      })
      req.session.isNewGet = 1;
      getDevice(req.headers["user-agent"]);
    }
    console.log(JSON.stringify(_classMap));
    res.render("index", {});
  });

  app.get("/userInfo", function(req, res) {
    res.render("userInfo", {});
  });

  app.get("/gameCenter", function(req, res) {
    res.render("gameCenter", {});
  });

  app.get("/jdInfo", function(req, res) {
    res.render("jdInfo", {});
  });
};

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

function getClientIP(req) {
  var ipAddress;
  var headers = req.headers;
  var forwardedIpsStr = headers["x-real-ip"] || headers["x-forwarded-for"];
  forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
  if (!ipAddress) {
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
}

function writeLog(req, err, info) {
  var meta = "[" + new Date() + "]" + req.url + "\n";
  if (err) {
    errorLog.write(meta + err.stack + "\n");
  } else {
    dbLog.write(meta + JSON.stringify(info) + "\n");
  }
}