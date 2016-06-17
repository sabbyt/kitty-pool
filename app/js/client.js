const angular = require('angular');
require('angular-route');
const kittyApp = angular.module('kittyApp', ['ngRoute']);

require('./services')(kittyApp);
require('./controllers/kitty-ctrl')(kittyApp);
require('./controllers/user-ctrl')(kittyApp);

kittyApp.config(['$routeProvider', (routes) => {
  routes
    .when('/home', {
      templateUrl: '/views/home.html'
    })
    .when('/', {
      redirectTo: '/home'
    })
    .when('/user', {
      controller: 'UserController',
      templateUrl: '/views/user.html'
    })
    .when('/tally', {
      controller: 'UserController',
      templateUrl: '/views/tally.html'
    })
    .when('/detailed', {
      controller: 'UserController',
      templateUrl: '/views/detailed.html'
    })
    .otherwise({
      templateUrl: '/views/four_oh_four.html'
    });
}]);
