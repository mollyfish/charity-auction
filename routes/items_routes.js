var express = require('express');
var bodyParser = require('body-parser');
var Item = require(__dirname + '/../models/item');
var handleError = require(__dirname + '/../lib/handleServerError');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var itemsRouter = module.exports = exports = express.Router();
itemsRouter.use(bodyParser.json());

itemsRouter.get('/items', function(req, res) {
  Item.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

itemsRouter.get('/allitems', function(req, res) {
  Item.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

itemsRouter.post('/items', eatAuth, function(req, res) {
  var newItem = new Item(req.body);
  newItem.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

itemsRouter.put('/items/:id', eatAuth, function(req, res) {
  var itemData = req.body;
  delete itemData._id;
  Item.update({_id: req.params.id}, itemData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

itemsRouter.delete('/items/:id', eatAuth, function(req, res) {
  Item.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});
