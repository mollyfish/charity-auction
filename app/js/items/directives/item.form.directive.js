module.exports = function(app) {
  app.directive('itemFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: './views/item.form.template.html',
      transclude: true,
      scope: {
        buttonText: '@',
        headingText: '@',
        formName: '@',
        item: '=',
        save: '&',
        change: '&'
        // this '&'' is usually used to pass a function, with a function call context
      }
    }
  });
};