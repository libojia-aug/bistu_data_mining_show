var path = require("path");
var fs = require("fs");
var express = require("express");
var cookieParser = require("cookie-parser");
var MongoStore = require("connect-mongo")(express);
var morgan = require('morgan')

var routes = require("./routes/index");
var settings = require("./settings");

var app = express();

app.set("port", process.env.PORT || settings.serverPort);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// cookie
app.use(cookieParser());
app.use(express.session({
  secret: settings.cookieSecret,
  key: settings.db,
  cookie: {
    maxAge: settings.cookieAge
  },
  store: new MongoStore({
    url: "mongodb://" + settings.host + "/" + settings.db
  })
}));

routes(app);

//log
var accessLogStream = fs.createWriteStream(path.join(__dirname, settings.logFolder, settings.accessLog), {
  flags: "r+"
});
app.use(morgan(settings.logFormat, {
  stream: accessLogStream
}));

var server = app.listen(app.get("port"), function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log(server.address());
  console.log("Example app listening at http://%s:%s", host, port);
});