module.exports = function(app) {
  app.directive('itemTranscludeDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: './views/item.transclude.template.html',
      transclude: true,
      scope: {
        messageOne: '@'
      }
    }
  });
};