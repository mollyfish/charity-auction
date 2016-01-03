require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('items controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('AuctionApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('ItemsController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.items)).toBe(true);
  });

  describe('REST request functions', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('ItemsController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an array to items with a GET all', function() {
      $httpBackend.expectGET('/api/items').respond(200, [{_id: 1, name: 'test item'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.items[0].name).toBe('test item');
    });

    it('should be able to create a new item', function() {
      $httpBackend.expectPOST('/api/items', {title: 'test item', artist: 'John Doe', materials: 'wool'}).respond(200, {title: 'a different item'});
      expect($scope.items.length).toBe(0);
      expect($scope.newItem).toEqual($scope.defaults);      
      $scope.newItem.name = 'test item';
      $scope.create($scope.newItem);
      $httpBackend.flush();
      expect($scope.items[0].name).toBe('a different item');
      expect($scope.newItem).toEqual($scope.defaults);
    });
  });
});
