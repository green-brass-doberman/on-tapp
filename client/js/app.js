

 // create the module and name it onTappApp
   // also include ngRoute for all our routing needs
var onTappApp = angular.module('onTappApp', [
  'ngRoute',
  'ui.bootstrap',
  'onTappApp.services',
  'onTappApp.nearby',
  'onTappApp.ratings',
  'onTappApp.auth'
  ]);

// configure our routes
onTappApp.config(function($routeProvider, uiGmapGoogleMapApiProvider) {
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

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyAQHm36O2gZr34HkBjElKYHox3LVWR8UWY',
    v: '3.17',
    libraries: 'weather,geometry,visualization'
  });
});


// create the controller and inject Angular's $scope
onTappApp.controller('MainController', ['$scope', function($scope) {
  $scope.title = 'On Tapp';
  $scope.setTitle = function() {
    $scope.navbarTitle = $scope.title;
  };
}]);
