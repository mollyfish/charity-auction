module.exports = function(app) {
  app.directive('itemDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: './views/item.directive.template.html',
      // replace: true,
      scope: {
        item: '='
        // = means interpret as JavaScript
      }
    }
  });
};

// if the element that this directive lands in already has content, 
// that content will be replaced.  
// Transclusion will let us add content without replacing.