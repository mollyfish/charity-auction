module.exports = function(app) {
  require('./controllers/items.controller')(app);
  require('./directives/directives')(app);
};