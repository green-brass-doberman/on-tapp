 // create the module and name it onTappApp
   // also include ngRoute for all our routing needs
var onTappApp = angular.module('onTappApp', ['ngRoute']);

// configure our routes
onTappApp.config(function($routeProvider) {
$routeProvider

    // route for the home page
    .when('/', {
        templateUrl : 'pages/home.html',
        controller  : 'mainController'
    })

    // route for the nearby page
    .when('/nearby', {
        templateUrl : 'pages/nearby.html',
        controller  : 'nearByController'
    })

    // route for the contact page
    .when('/ratings', {
        templateUrl : 'pages/ratings.html',
        controller  : 'ratingsController'
    });
});


// create the controller and inject Angular's $scope
onTappApp.controller('mainController', function($scope) {
  $scope.name = 'user';
  $scope.sayHello = function() {
    $scope.greeting = 'Hello ' + $scope.name;
  };
});

onTappApp.controller('nearByController', function($scope) {
  $scope.name = 'user';
  $scope.sayHello = function() {
    $scope.greeting = 'Hello ' + $scope.name;
  };
});

onTappApp.controller('ratingsController', function($scope) {
  $scope.name = 'user';
  $scope.sayHello = function() {
    $scope.greeting = 'Hello ' + $scope.name;
  };
});
