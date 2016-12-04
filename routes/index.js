var crypto = require('crypto'),
  fs = require('fs'),
  // User = require('../models/user.js'),
  path = require('path');
var util = require('util');

module.exports = function(app) {
  console.log("in it");
  //在线用户计数
  // app.get('/test', function(req, res) {
  //   Post.getTen(null, 1, function(err, posts, total) {
  //     if (err) {
  //       posts = [];
  //     }
  //     var data = JSON.stringify(posts);
  //     console.log(data);
  //     res.writeHead(200, {
  //       'content-type': 'text/html',
  //       'charset': 'utf-8'
  //     })
  //     res.write(data);
  //     res.end();
  //   });
  // });
  app.get('/', function(req, res) {
    console.log(req.headers);
    // res.send('Hello World!');
    res.render('index', {
      title: 'Express'
    });
    console.log("in");
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)

    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
  });

};