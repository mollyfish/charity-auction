module.exports = function(app) {
  app.controller('DummyController', ['$scope', function($scope) {
    $scope.greeting = 'This is a stoopid controller';
  }]);
};