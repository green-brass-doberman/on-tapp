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
    .when('/signup', {
      templateUrl: 'pages/signup.html',
      controller: 'AuthController',
    })

    .when('/signin', {
      templateUrl: 'pages/signin.html',
      controller: 'AuthController'
    })

    .otherwise({
      redirectTo: '/'
    });
});


// create the controller and inject Angular's $scope
onTappApp.controller('MainController', ['$scope', function($scope) {
  $scope.name = 'user';
  $scope.sayHello = function() {
    $scope.greeting = 'Hello ' + $scope.name;
  };
}]);

onTappApp.controller('NearByController', ['$scope', function($scope) {
  $scope.breweries = [
    {name:'XXXX Brewery', description: 'Founded in 2015, it has the best beer in the world.', distance: 100},
    {name:'YYYY Brewery', description: 'Founded in 1915, it has the worst beer in the world.', distance: 200},
    {name:'ZZZZ Brewery', description: 'Founded in 1815, it no longer brews any beer for the world.',  distance: 300}
  ];
}]);

onTappApp.controller('RatingsController', ['$scope', function($scope) {
  $scope.name = 'user';
}]);

onTappApp.controller('AuthController', ['$scope', function($scope) {
  $scope.name = 'user';
}]);


