var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/item_stream_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Item = require(__dirname + '/../models/item');
var User = require(__dirname + '/../models/user');

describe('item routes', function() {
  var token = "";
  var newToken = "";
  var userId = "";
    before(function(done){
      var userData = {username: 'HannahMontana', password:'password123'};
      chai.request('http://localhost:3000')
      .post('/api/signup')
      .send(userData)
      .end(function(err, res){
        token = res.body.token;
        User.findOne({'auth.basic.username': 'HannahMontana'}, function(err, user){
            userId = user.id;
        });
        expect(err).to.eql(null);
        expect(token).to.not.eql("");
        done();
      });
    });
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to get all da items', function(done) {
    chai.request('localhost:3000')
      .get('/api/items')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

    it('should be able to create an item', function(done) {
      var itemData = {'title': 'test title', token: token};
      chai.request('localhost:3000')
        .post('/api/items')
        .send(itemData)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.title).to.eql('test title');
          expect(res.body).to.have.property('_id');
          done();
        });
    });


    describe('needs a item', function() {
      beforeEach(function(done) {
        (new Item({title: 'test title'})).save(function(err, data) {
          expect(err).to.eql(null);
          this.item = data;
          done();
        }.bind(this));
      });

      it('should be able to modify a item', function(done) {
        chai.request('localhost:3000')
          .put('/api/items/' + this.item._id)
          .send({name: 'a different item name', token: token})
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('success!');
            done();
          });
      });

      it('should be able to murder a item', function(done) {
        chai.request('localhost:3000')
          .delete('/api/items/' + this.item._id)
          .send({token: token})
          .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('success!');
            done();
          });
      });

  });
});
