var path = require("path");
var fs = require("fs");

var settings = require("./settings");
var User = require("../models/user");

module.exports = function(app) {
  app.get("/", function(req, res) {
    console.log(req.session.isGet);
    if (!req.session.isGet) {
      var newUser = new User({
        agent: req.headers["user-agent"],
        language: req.headers["accept-language"],
        ip: getClientIP(req),
        cookies: req.cookies
      });
      newUser.save(function(err, user) {
        // console.log(user);
      })
      req.session.isGet = new Date(Date.now() + (8 * 60 * 60 * 1000));
    }
    res.render("test", {});
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
