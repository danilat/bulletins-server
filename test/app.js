process.env.NODE_ENV = 'test'

var assert = require("assert");
var app = require('./../app.js');
var request = require('supertest')('http://127.0.0.1:3000');
var Bulletin = require('./../bulletin_model.js')

describe('Root path /', function(){
  it('should respond OK', function(done){
    request
      .get('/')
      .expect(200, done);
  });
});

describe('New bulletin form', function(){
  it('should respond OK', function(done){
    request
      .get('/bulletins/new')
      .expect(200, done);
  });
});

describe('When create bulletin', function(){
  before(function(done) {
    Bulletin.remove({}, function(){
      done();
    });
  });

  it('should be present on the app', function(done){
    var data = {
        name: 'foobar',
        body: '7 caballos que vienen de Bonanza'
    };
    request
      .post('/bulletins')
      .send(data)
      .end(function(err, res) {
        Bulletin.find({}, function (error, bulletins) {
          assert.equal(1, bulletins.length)
          done();
        });
      });
  });
});

describe('Bulletins Api', function(){
  var bulletin 
  before(function(done) {
    Bulletin.remove({}, function(){
      bulletin = new Bulletin({name: 'Condemor diodenoo condemor', 
          published_at: new Date(), 
          body: 'Lorem fistrum al ataquerl apetecan pecador benemeritaar. Ese pedazo de me cago en tus muelas llevame al sircoo benemeritaar.'});
      bulletin.save(function(err){
        done();
      });
    });
  });
  
  describe('list', function(){
    it('should respond OK', function(done){
      request.get('/api/bulletins')
        .expect(200, done);
    });
    it('should return a list with all the bulletins', function(done){
      request.get('/api/bulletins')
        .end(function(err, res) {
          var result = JSON.parse(res.text);
          assert.equal(result.length, 1);
          assert.equal(result[0].name, bulletin.name);
          done();
        })
    });  
  });
  
})