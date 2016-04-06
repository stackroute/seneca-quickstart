var should = require('should');

describe('Math Plugin', function() {
  var seneca = require('seneca')();
  var mathPlugin;

  it('Define math Plugin', function(done) {
    mathPlugin = function () {
      this.add('role:math,cmd:sum', function(msg, respond) {
        return respond(null,{answer: msg.left+msg.right});
      });
      this.add('role:math,cmd:product', function(msg, respond) {
        return respond(null,{answer: msg.left*msg.right});
      });
    }

    done();
  });

  it('Load math plugin into seneca', function(done) {
    seneca.use(mathPlugin);
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
  });

  it('Assert Responses', function(done) {
    console.log('sumResponse: ' + JSON.stringify(sumResponse));
    sumResponse.should.have.property('answer').and.be.exactly(5);
    productResponse.should.have.property('answer').and.be.exactly(6);
    done();
  });
});