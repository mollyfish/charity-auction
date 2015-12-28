module.exports = function(app) {
  app.controller('AuthController', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {

    $scope.getUser = function() {
      $scope.token = $cookies.get('token');
      $http.defaults.headers.common.token = $scope.token;
      $http.get('/api/users')
      .then(function(res) {
        $scope.currentUser = res.data.username;
      }, function(err) {  
        console.log(err);
      })
    };

    $scope.logout = function() {
      $scope.token = null;
      $scope.currentUser = null;
      $cookies.remove('token');
      $location.path('/allitems');
    };

    $scope.signin = function() {
      $location.path('/signin');
    };

    $scope.signup = function() {
      $location.path('/signup');
    };
    
    $scope.userItems = function() {
      $location.path('/items');
    };

    $scope.allItems = function() {
      $location.path('/allitems');
    };
    
  }]);
};