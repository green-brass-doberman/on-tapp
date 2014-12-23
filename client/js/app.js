 // create the module and name it onTappApp
   // also include ngRoute for all our routing needs
var onTappApp = angular.module('onTappApp', ['ngRoute']);

// configure our routes
onTappApp.config(function($routeProvider) {
$routeProvider
  // route for the home page
  .when('/', {
    templateUrl : 'pages/home.html',
    controller  : 'MainController'
  })

  // route for the nearby page
  .when('/nearby', {
    templateUrl : 'pages/nearby.html',
    controller  : 'NearByController'
  })

  // route for the contact page
  .when('/ratings', {
    templateUrl : 'pages/ratings.html',
    controller  : 'RatingsController'
  })

  // route for authetications
  .when('/signin', {
    templateUrl: 'pages/signin.html',
    controller: 'AuthController'
  })
  .when('/signup', {
    templateUrl: 'pages/signup.html',
    controller: 'AuthController',

  })
  .otherwise({
    redirectTo: '/'
  });
});


// create the controller and inject Angular's $scope
onTappApp.controller('MainController', function($scope) {
  $scope.name = 'user';
  $scope.sayHello = function() {
    $scope.greeting = 'Hello ' + $scope.name;
  };
});

onTappApp.controller('NearByController', function($scope) {
  $scope.name = 'user';
  $scope.sayHello = function() {
    $scope.greeting = 'Hello ' + $scope.name;
  };
});

onTappApp.controller('RatingsController', function($scope) {
  $scope.name = 'user';
  $scope.sayHello = function() {
    $scope.greeting = 'Hello ' + $scope.name;
  };
});

onTappApp.controller('AuthController', function($scope) {
  $scope.name = 'user';
  $scope.sayHello = function() {
    $scope.greeting = 'Hello ' + $scope.name;
  };
});


