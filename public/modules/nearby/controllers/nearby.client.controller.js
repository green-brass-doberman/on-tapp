'use strict';

angular.module('nearby').controller('NearbyController', ['$scope', 'Breweries', 'geolocation', '$stateParams', '$firebase', 'uiGmapLogger',
	function($scope, Breweries, geolocation, $stateParams, $firebase, uiGmapLogger) {
		// Controller Logic
		// ...

    // enable logging of google map info and error
    uiGmapLogger.doLog = true;

    // this array would be used to fetch data from brewerydb factory
    $scope.breweries = [];

    // an object to story user's current coordinate
    $scope.coords = {};

    // function to access users geolocation coordinates
    geolocation.getLocation().then(function(data){
      // $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
      $scope.coords = {lat:37.7833, long:-122.4167}; // hard code san francisco for Victor

      $scope.map = { center: { latitude: $scope.coords.lat, longitude: $scope.coords.long }, zoom: 11};
      curLocationMarker();
      Breweries.getData($scope.coords).success(handleSuccess);
    });

    // pushing breweries data from $http request and place markers
    var handleSuccess = function(data, status){
      $scope.breweries = data.data;
      placeMarker();
    };

    // set status of the accordion
    $scope.status = {
      isItemOpen: new Array($scope.breweries.length),
      isFirstDisabled: false
    };

    // open the first item of the accordion
    $scope.status.isItemOpen[0] = true;

    // marker for current coordinate
    var curLocationMarker = function(){
      $scope.marker = {
        id: 'curLoc',
        coords: {
          latitude: $scope.coords.lat,
          longitude: $scope.coords.long,
        },
        options: { title: 'You are here' }
      };
    };

    // an array to store all breweries marker
    $scope.allMarkers = [];

    // create markers for all breweries
    var createMarker = function (i, lat, lng, name) {
      var ret = {
        id: i,
        latitude: lat,
        longitude: lng,
        options: { title: name },
        icon: '/modules/nearby/images/beer-icon.png'
      };
      return ret;
    };

    // a function to place all breweries markers
    var placeMarker = function(){
      var markers = [];
      for (var i = 0; i < $scope.breweries.length; i++) {
        var lat = $scope.breweries[i].latitude;
        var lng = $scope.breweries[i].longitude;
        var name = $scope.breweries[i].brewery.name;
        markers.push(createMarker(i, lat, lng, name));
      }
      $scope.allMarkers = markers;
    };

      // handle the stars rating
    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;

    // hoveing over on ratings stars
    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

    // set the ratings stars
    $scope.ratingStates = [
      {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    ];

    // function to save ratings
    $scope.saveRating = function(){
      var brewery = allBreweries[0];
      brewery.ratings = $scope.percent;
    };

    // connect to firebase
    var ref = new Firebase('https://on-tapp.firebaseio.com/ratings');

    var fb = $firebase(ref);

    // function to set the default data
    $scope.reset = function() {

      $scope.rate = 0;

      fb.$set({
        xxxx: {
          name: 'XXXX Brewery',
          ratings: {
            stars: {
              number: '0',
              rated: false
            }
          }
        },
        yyyy: {
          name: 'YYYY Brewery',
          ratings: {
            stars: {
              number: '0',
              rated: false
            }
          }
        }
      });

    };

    // sync as object
    var syncObject = fb.$asObject();

    // three way data binding
    syncObject.$bindTo($scope, 'ratings');
  }
]);
