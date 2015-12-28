module.exports = function(app) {
  // this parameter 'app' gets passed in in entry.js
  require('./dummy_controller')(app);
};