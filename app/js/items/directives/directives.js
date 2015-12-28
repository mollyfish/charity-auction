module.exports = function(app) {
  // this parameter 'app' gets passed in in entry.js
  require('./item.directive')(app);
  require('./item.form.directive')(app);
  require('./item.transclude.directive')(app);
};