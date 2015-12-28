module.exports = function(app) {
  app.directive('listDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: './views/list.directive.template.html',
      transclude: true,
      scope: {
        resource: '=',
        title: '@'
      }
    }
  });
};