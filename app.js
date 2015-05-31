var express = require('express');
var mongoose = require('mongoose');
var Bulletin = require('./bulletin_model.js')
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/api/bulletins', function (req, res) {
  Bulletin.find({}, function (err, docs) {
    res.jsonp(docs);
  });
});

var server = app.listen(3000, function () {
  mongoose.connect('mongodb://localhost/test');
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});