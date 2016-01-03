var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
process.env.MONGOLAB_URI = 'mongodb://localhost/auth_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');
var eatAuth = require(__dirname + '/../lib/eat_auth');
var httpAuth = require(__dirname + '/../lib/basic_http_authentication');

describe('http authentication', function() {
  it('should be able to parse http authentication', function() {
    var req = {
      headers: {
        authorization: 'Basic ' + (new Buffer('testUser:password123')).toString('base64')
      }
    };

    httpAuth(req, {}, function() {
      expect(typeof req.auth).to.eql('object');
      expect(req.auth.username).to.eql('testUser');
      expect(req.auth.password).to.eql('password123');
    });
  });
});

describe('auth', function() {
  after(function(done){
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a user', function(done) {
    chai.request('localhost:3000/api')
      .post('/signup')
      .send({username: 'newUser', password: 'terriblepassword'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token).to.have.length.above(0);
        done();
      });
  });

  describe('with user already in database', function() {
    before(function(done) {
      var user = new User();
      user.username = 'newestUser';
      user.auth.basic.username = 'newestUser';
      user.hashPassword('testing123');
      user.save(function(err, data) {
        if (err) throw err;
        user.generateToken(function(err, token) {
          if (err) throw err;
          this.token = token;
          done();
        }.bind(this));
      }.bind(this));
    });

    it('should be able to sign in', function(done) {
      chai.request('localhost:3000/api')
        .get('/signin')
        .auth('newestUser', 'testing123')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.token).to.have.length.above(0);
          done();
        });
    });

    it('should be able to authenticate with eat auth', function(done) {
      var token2 = this.token;
      var req = {
        body: {
          token: this.token
        },
        headers: {
          token: this.token
        }
      };

      eatAuth(req, {}, function() {
        expect(req.user.username).to.eql('newestUser');
        done();
      });
    });
  });
});