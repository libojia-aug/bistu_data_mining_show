var path = require('path');
var express = require('express');
var routes = require('./routes/index');
var app = express();

app.set('port', process.env.PORT || 3001);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

routes(app);
var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(server.address());
  console.log('Example app listening at http://%s:%s', host, port);
});