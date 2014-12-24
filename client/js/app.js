 // create the module and name it onTappApp
   // also include ngRoute for all our routing needs
var onTappApp = angular.module('onTappApp', ['ngRoute', 'ui.bootstrap', 'uiGmapgoogle-maps', 'onTappApp.services']);

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

onTappApp.controller('NearByController', ['$scope', 'breweries', function($scope, breweries) {
  $scope.breweries = breweries.breweries;

  $scope.status = {
      isItemOpen: new Array($scope.breweries.length),
      isFirstDisabled: false
    };

  $scope.status.isItemOpen[0] = true;

  // render Google map and set center at San Francisco by default
  $scope.map = { center: { latitude: 37.7833, longitude: -122.4167 }, zoom: 8 };
}]);

onTappApp.controller('RatingsController', ['$scope', function($scope) {
  $scope.rate = 0;
  $scope.max = 5;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.ratingStates = [
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
  ];
}]);

onTappApp.controller('AuthController', ['$scope', function($scope) {
  $scope.name = 'user';
}]);


