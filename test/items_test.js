var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/items_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Item = require(__dirname + '/../models/item');

describe('item routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a item', function(done) {
    var itemData = {name: 'test item'};
    chai.request('localhost:3000')
      .post('/api/items')
      .send(itemData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('test item');
        expect(res.body).to.have.property('_id');
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

  describe('needs a item', function() {
    beforeEach(function(done) {
      (new Item({name: 'test item'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.item = data;
        done();
      }.bind(this));
    });

    it('should be able to modify a item', function(done) {
      chai.request('localhost:3000')
        .put('/api/items/' + this.item._id)
        .send({name: 'a different item name'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });

    it('should be able to murder a item', function(done) {
      chai.request('localhost:3000')
        .delete('/api/items/' + this.item._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success!');
          done();
        });
    });
  });
});
