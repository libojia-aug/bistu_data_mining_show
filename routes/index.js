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

module.exports = function(app) {
  app.get("/", function(req, res) {
    if (!req.session.isGet) {
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
      req.session.isGet = 1;
    }
    res.render("index", {});
  });

  app.get("/userInfo", function(req, res) {
    res.render("userInfo", {
    });
  });

  app.get("/gameCenter", function(req, res) {
    res.render("gameCenter", {
    });
  });
  
  app.get("/jdInfo", function(req, res) {
    res.render("jdInfo", {
    });
  });
};



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