var assert = require("assert");
var app = require('./../app.js');
var request = require('supertest')('http://127.0.0.1:3000');

describe('Root path /', function(){
    it('should respond OK', function(done){
      request
        .get('/')
        .expect(200, done);
    });
});

describe('Bulletins Api', function(){
  describe('list', function(){
    it('should respond OK', function(done){
      request.get('/api/bulletins')
        .expect(200, done);
    });
    it('should return a list with all the bulletins', function(){
      
    });  
  });
  
})