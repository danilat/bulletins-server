var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Bulletin = require('./bulletin_model.js')
var app = express();

app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

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
app.get('/bulletins/:id', function (req, res) {
  Bulletin.findById(req.param('id'), function(err, bulletin){
    res.render('show', {bulletin: bulletin});
  })
});
app.get('/bulletins/:id/edit', function (req, res) {
  Bulletin.findById(req.param('id'), function(err, bulletin){
    res.render('edit', {bulletin: bulletin});
  })
});
app.post('/bulletins/:id', function (req, res) {
  Bulletin.findById(req.param('id'), function(err, bulletin){
    bulletin.name = req.body.name;
    bulletin.body = req.body.body;

    bulletin.save(function(err){
      res.redirect('/bulletins/' + bulletin.id);
    });
  })
});
app.get('/bulletins/:id/delete', function (req, res) {
  Bulletin.findById(req.param('id'), function(err, bulletin){
    bulletin.remove(function(error){
      res.redirect('/');
    });
  })
});

app.get('/api/bulletins', function (req, res) {
  Bulletin.find({}, function (err, docs) {
    res.jsonp(docs);
  });
});

var theport = process.env.PORT || 3000;

var server = app.listen(theport, function () {
  console.log(process.env.NODE_ENV)
  if(process.env.NODE_ENV == 'test'){
    mongoose.connect('mongodb://localhost/test');
  }else{
    var mongo_uri = process.env.MONGOLAB_URI || 
      process.env.MONGOHQ_URL ||
      'mongodb://localhost/bulletins-server'
    mongoose.connect(mongo_uri);
  }
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});