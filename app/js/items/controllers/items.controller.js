module.exports = function(app) {
  app.controller('ItemsController', ['$scope', '$http', 'cfResource', function($scope, $http, cfResource) {
    $scope.items = [];
    $scope.errors = [];
    $scope.date = new Date();
    $scope.date.setSeconds(0,0);
    $scope.originalSport;
    $scope.defaults = {date: $scope.date};
    $scope.newItem = angular.copy($scope.defaults);

    var itemsResource = cfResource('items');

    $scope.getAll = function() {
      itemsResource.getAll(function(err,data) {
        if (err) return err;

        $scope.items = data;
      }); 
    };

    $scope.create = function(item) {
      itemsResource.create(item, function(err,data) {
        if (err) {
          return err 
        } else {

          // console.dir(data);
          $scope.items.push(data);
          $scope.newItem = angular.copy($scope.defaults);
        }
      });
    };

    $scope.update = function(item) {
      item.editing = false;
      $http.put('/api/items/' + item._id, item)
        .then(function(res) {
          console.log(item.sport + ' has been edited!');
          console.dir(item);
        }, function(err) {
          $scope.errors.push('could not find ' + item.sport);
          console.log(err.data);
        });
    };

    $scope.rememberItem = function(item) {
      console.dir(item);
      item.date = new Date(item.date);
      console.dir(item);
      $scope.date = item.date;
      console.dir(item);
      $scope.originalSport = item.sport;
      console.dir(item);
    };
    
    $scope.resetItem = function(item) {
      item.sport = $scope.originalSport;
    };

    $scope.remove = function(item) {
      if (confirm('Are you sure you want to delete this item?')) {
        $scope.items.splice($scope.items.indexOf(item), 1);
          return $http.delete('/api/items/' + item._id)
            .then(function(res) {
              console.log('sa-weet. item murdered.')
            }, function(err) {
              console.log(err.data);
              $scope.errors.push('could not murder that ' + item.sport + ' item');
              $scope.getAll();
            });
      } else {
        return;
      }     
    };

    $scope.bid = function(item) {
      console.log(item.title);
    };

  }]);
};
