var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  category: String,
  artist: String,
  title: String,
  colorway: String,
  minBid: Number,
  currentBid: Number,
  winningBid: Number,
  quantity: Number,
  materials: String,
  details: String,
  imgs: {}
});

module.exports = mongoose.model('Item', itemSchema);
