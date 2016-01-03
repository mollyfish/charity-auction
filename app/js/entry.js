require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');
var angular = window.angular;

var auctionApp = angular.module('AuctionApp', ['ngRoute', 'ngCookies', 'base64']);
// require things in this order: SERVICES, CONTROLLERS, DIRECTIVES


require('./services/services')(auctionApp);

require('./controllers/controllers')(auctionApp);
// requiring the entry/index file, 
// and passing the app that the resources will be used in

require('./directives/directives')(auctionApp);
require('./filters/filters')(auctionApp);


require('./items/items')(auctionApp);
require('./auth/auth')(auctionApp);


// services are global
// controllers can use services
// directives can use either of the two preceding

auctionApp.config(['$routeProvider', function($route) {
  $route
    .when('/items', {
      templateUrl: '/views/item.view.html',
      controller: 'ItemsController'
    })
    .when('/signup', {
      templateUrl: '/views/auth.view.html',
      controller: 'SignupController'
    })
    .when('/signin', {
      templateUrl: '/views/auth.view.html',
      controller: 'SigninController'
    })
    .otherwise({
      redirectTo: '/items'
    })
}]);