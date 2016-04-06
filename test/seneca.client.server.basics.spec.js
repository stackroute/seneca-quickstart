var should = require('should');

describe('Client-Server Microservices', function() {
  var senecaServer,senecaClient;
  
  it('Define Server Microservice', function(done) {
    senecaServer = require('seneca')();
    senecaServer.add('role:math,cmd:sum', function(msg, respond) {
      return respond(null, {answer: msg.left + msg.right});
    });
    // Listens on TCP port 10201 of 
    senecaServer.listen({type: 'tcp'});
    done();
  });

  it('Define Client Microservice', function(done) {
    senecaClient = require('seneca')();
    senecaClient.add('role:math,cmd:product', function(msg, respond) {
      return respond(null, {answer: msg.left*msg.right});
    });
    // Connects to TCP port 10201
    senecaClient.client({type: 'tcp'});
    done();
  });

  var sumResponseServer,sumResponseClient,productResponseClient;

  it('Invoke Sum Microservice on Server', function(done) {
    senecaServer.act('role:math,cmd:sum,left:2,right:3', function(err, response) {
      if(err) { return done(err); }
      sumResponseServer = response;
      done();
    });
  });

  it('Invoke Sum Microservice on Client', function(done) {
    senecaClient.act('role:math,cmd:sum,left:2,right:3', function(err, response) {
      if(err) { return done(err); }
      sumResponseClient = response;
      done();
    });
  });

  it('Invoke Product Microservice on Server', function(done) {
    senecaServer.act('role:math,cmd:product,left:2,right:3', function(err, response) {
      should(err).be.ok();
      done();
    });
  });

  it('Invoke Product Microservice on Client', function(done) {
    senecaClient.act('role:math,cmd:product,left:2,right:3', function(err, response) {
      if(err) { return done(err); }
      productResponseClient = response;
      done();
    });
  });

  it('Assert Responses', function(done) {
    sumResponseServer.should.have.property('answer').and.be.exactly(5);
    sumResponseClient.should.have.property('answer').and.be.exactly(5);
    productResponseClient.should.have.property('answer').and.be.exactly(6);
    done();
  });
});