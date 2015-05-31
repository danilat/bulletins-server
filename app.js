var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Bulletin = require('./bulletin_model.js')
var app = express();

app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  Bulletin.find({}, function (err, docs) {
    res.render('index', { bulletins: docs });
  });
});
app.get('/bulletins/new', function (req, res) {
  res.render('new');
});
app.post('/bulletins', function (req, res) {
  console.log(req.body)
  bulletin = new Bulletin({name: req.body.name, body: req.body.body});
  bulletin.save(function(err){
    res.redirect('/');
  });
});

app.get('/api/bulletins', function (req, res) {
  Bulletin.find({}, function (err, docs) {
    res.jsonp(docs);
  });
});

var server = app.listen(3000, function () {
  console.log(process.env.NODE_ENV)
  if(process.env.NODE_ENV == 'test'){

    mongoose.connect('mongodb://localhost/test');
  }else{
    mongoose.connect('mongodb://localhost/bulletins-server');
  }
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});