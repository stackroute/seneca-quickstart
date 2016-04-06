var should = require('should');

describe('Math Microservices', function() {
  var seneca = require('seneca')();
  
  it('Define Math Microservices', function(done) {
    // First argument represents a pattern that matches a JSON. This argument can alternatively be denoted as a JSON itself.
    seneca.add('role:math,cmd:sum', function(msg, respond) {
      return respond(null, {answer: msg.left+msg.right});
    })
    seneca.add('role:math,cmd:product', function(msg, respond) {
      return respond(null, {answer: msg.left*msg.right});
    });

    done();
  });

  var sumResponse,productResponse;

  it('Invoke Sum Microservice', function(done) {
    seneca.act('role:math,cmd:sum,left:2,right:3', function(err, response) {
      if(err) { return done(err); }
      sumResponse = response;
      done();
    });
  });

  it('Invoke Product Microservice', function(done) {
    seneca.act('role:math,cmd:product,left:2,right:3', function(err, response) {
      if(err) { return done(err); }
      productResponse = response;
      done();
    });
  })

  it('Assert Responses', function(done) {
    sumResponse.should.have.property('answer').and.be.exactly(5);
    productResponse.should.have.property('answer').and.be.exactly(6);
    done();
  });
});