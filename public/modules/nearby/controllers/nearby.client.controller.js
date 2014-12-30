'use strict';

angular.module('nearby').controller('NearbyController', ['$scope', 'Breweries', 'geolocation', '$stateParams',
	function($scope, Breweries, geolocation, $stateParams) {
		// Controller Logic
		// ...

    $scope.breweries = [];
    $scope.coords = {};

    geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
      // $scope.coords = {lat:37.7833, long:-122.4167}; // hard code san francisco for Victor

      $scope.map = { center: { latitude: $scope.coords.lat, longitude: $scope.coords.long }, zoom: 11};
      curLocationMarker();
      Breweries.getData($scope.coords).success(handleSuccess);
    });

    var handleSuccess = function(data, status){
      $scope.breweries = data.data;
      placeMarker();
    };

    $scope.status = {
      isItemOpen: new Array($scope.breweries.length),
      isFirstDisabled: false
    };

    $scope.status.isItemOpen[0] = true;

    var curLocationMarker = function(){
      $scope.marker = {
        id: 'curLoc',
        coords: {
          latitude: $scope.coords.lat,
          longitude: $scope.coords.long,
        },
        options: { title: 'My Location' }
      };
    };

    $scope.allMarkers = [];

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
  }
]);
