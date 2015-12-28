require(__dirname + '/../../app/js/entry');
// remember what happens in entry.js - that's what we are pulling in here, too
require('angular-mocks');

describe('items controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  // create a mock version of our app:
  beforeEach(angular.mock.module('TrainingApp'));
  // inject our mocked dependencies to run fake controllers and scopes
  // we don't need a DOM, etc.

  // no array of injections b/c we will never minify our tests
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    // b/c we have no view/html, we have to manually mock
    // the piece that would be created when we set ng-controller = ourApp
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    // this is our test test, to be sure the harness is working
    var controller = $ControllerConstructor('ItemsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.items)).toBe(true);
  });

  describe('REST request function', function() {
    // $httpBackend is what makes the requests in testing
    // means we can fake requests! 
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      // the weird _ is to keep jshint from pitching a self-reference fit
      $httpBackend = _$httpBackend_;
      // creating a new $scope obj off the $rootScope
      $scope = $rootScope.$new();
      // passing that new $scope into the new controller that gets made
      $ControllerConstructor('ItemsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an array to items with a GET all', function() {
      // no done() needed, b/c we are not asynch

      // getAll() makes an ajax request, then it gets an array, then it saves the array
      // into $scope.items - that last is what we want to test 
      // (server tests are done already in mocha testing)

      $httpBackend.expectGET('/api/items').respond(200, [{_id: 1, name: 'test item'}]);
      $scope.getAll(); 
      // this is the fake request
      $httpBackend.flush(); 
      // every expected statement should now resolve 
      // (two lines up will go, will send back the expected response)
      expect($scope.items[0].name).toBe('test item');
      // looks for the expected response
    });

    it('should be able to create a new item', function() {
      $httpBackend.expectPOST('/api/items', {'flavor':'grizzly', 'fishPreference':'salmons', 'name': 'test item'}).respond(200, {name: 'a different item'});
      // calling back a different item so we know it's not the one we GOT before
      expect($scope.items.length).toBe(0);
      expect($scope.newItem).toEqual($scope.defaults);
      $scope.newItem.name = 'test item';
      // expectPOST is expecting this name
      $scope.create($scope.newItem);
      $httpBackend.flush();
      expect($scope.items[0].name).toBe('a different item');
      expect($scope.newItem).toEqual($scope.defaults);
      // does a not-deep comparison of the two objects 
      // to see if they have the same properties
    });


  });
});

