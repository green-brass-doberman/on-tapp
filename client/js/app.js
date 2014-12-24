 // create the module and name it onTappApp
   // also include ngRoute for all our routing needs
var onTappApp = angular.module('onTappApp', ['ngRoute', 'onTappApp.services']);

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
  $scope.title = 'On Tapp';
  $scope.setTitle = function() {
    $scope.navbarTitle = $scope.title;
  };
}]);

onTappApp.controller('NearByController', ['$scope', 'breweries', function($scope, breweries) {
  $scope.breweries = breweries.breweries;
}]);

onTappApp.controller('RatingsController', ['$scope', function($scope) {
  $scope.name = 'user';
}]);

onTappApp.controller('AuthController', ['$scope', function($scope) {
  $scope.name = 'user';
}]);


