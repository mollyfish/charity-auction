var angular = window.angular;
module.exports = function(app) {
  app.controller('AllItemsController', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/allitems')
    .then(function(res) {
      $scope.items = res.data;
    }, function(err) {
      console.log(err);
    })
  }]);
};
