var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data);
  };
};

var handleFail = function(callback) {
  return function(res) {
    callback(res.data);
  };
};

module.exports = function(app) {
  // this is only run once, so cfResource doesn't get a capital C
  app.factory('cfResource', ['$http', function($http) {
    return function(resourceName) {
      // resourceName is something like 'items' and thus the request will go to api/items
        var resource = {};
        // this inner object can be created many many times
        resource.getAll = function(callback) {
          $http.get('/api/' + resourceName)
            .then(handleSuccess(callback), handleFail(callback));
        };

        resource.create = function(data, callback) {
          $http.post('/api/' + resourceName, data)
            .then(handleSuccess(callback), handleFail(callback));
        };
        return resource;
      };
  }]);
};