'use strict';

angular.module('nearby').controller('NearbyController', ['$scope', 'Breweries', 'geolocation', '$stateParams',
	function($scope, Breweries, geolocation, $stateParams) {
		// Controller Logic
		// ...

    $scope.breweries = [];
    $scope.coords = {};

    geolocation.getLocation().then(function(data){
      // $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
      $scope.coords = {lat:37.7833, long:-122.4167}; // hard code san francisco for Victor

      // current location marker
      $scope.marker.coords.latitude = $scope.coords.lat;
      $scope.marker.coords.longitude = $scope.coords.long;

      $scope.map = { center: { latitude: $scope.coords.lat, longitude: $scope.coords.long }, zoom: 10};
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

    $scope.options = {scrollwheel: false};

    var createMarker = function (i, lat, lng, name, idKey) {
      if (idKey === undefined) {
        idKey = 'id';
      }

      var latitude = lat;
      var longitude = lng;
      var ret = {
          latitude: latitude,
          longitude: longitude,
          title: name,
          show: false
      };
      ret.onClick = function() {
          ret.show = !ret.show;
      };
      ret[idKey] = i;

      ret.icon = '/modules/nearby/images/beer-icon.png';

      return ret;
    };

    $scope.allMarkers = [];


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

    // $scope.getCurrentLocation = function(){
    //   geolocation.getLocation().then(function(data){
    //     $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
    //     $scope.map = { center: { latitude: data.coords.latitude, longitude: data.coords.longitude }, zoom: 14};
    //   });
    // };

    // initiate current location marker
    $scope.marker = {
      id: 0,
      coords: {
        latitude: null,
        longitude: null
      },
      options: { draggable: false },
    };
  }
]);
