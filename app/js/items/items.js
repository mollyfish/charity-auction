module.exports = function(app) {
  // this parameter 'app' gets passed in in entry.js
  require('./controllers/all.items.controller')(app);
  require('./controllers/items.controller')(app);
  require('./directives/directives')(app);
};