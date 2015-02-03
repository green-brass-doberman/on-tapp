'use strict';

angular.module('nearby').controller('NearbyController', ['$scope', 'uiGmapGoogleMapApi', 'uiGmapIsReady', 'Breweries', 'geolocation', 'uiGmapLogger', 'usSpinnerService', 'Core', 
  function($scope, uiGmapGoogleMapApi, uiGmapIsReady, Breweries, geolocation, uiGmapLogger, usSpinnerService, Core) {

    // enable logging of google map info and error
    uiGmapLogger.doLog = true;

    $scope.breweries = []; // used to fetch data from brewerydb factory
    $scope.coords = {}; // user's current coordinates
    $scope.allMarkers = []; // array to store the brewery markers
    $scope.oldWindow = -1; // var to hold id of old info window
    var bounds, radius;

    // pushing breweries data from $http request and place markers
    var handleSuccess = function(data, status){
      if (data.data){
        $scope.breweries = data.data;
        placeMarker();
      }
      updateRadius();
      usSpinnerService.stop('spinner-1'); //stop the spinner
    };

    // marker for current coordinate
    var curLocationMarker = function(){
      $scope.marker = {
        id: 'curLoc',
        coords: {
          latitude: $scope.coords.latitude,
          longitude: $scope.coords.longitude,
        },
        options: {
          title: 'You are here!'
        }
      };
    };

    var createMarker = function (i) {
      var name = $scope.breweries[i].brewery.name;
      var addr = ($scope.breweries[i].streetAddress !== undefined) ? $scope.breweries[i].streetAddress + '<br>' : '';
      var phone = ($scope.breweries[i].phone !== undefined) ? $scope.breweries[i].phone + '<br>' : '';
      var id = $scope.breweries[i].brewery.id;
      var dist = $scope.breweries[i].distance + ' miles away<br>';
      var desc = '<div class="info-window"><a href="#!/brewery/' + id + '"><strong>' +
                 name + '</strong></a><br>' + dist + addr + phone + '</div>';
      var ret = {
        id: i,
        coords : {
          latitude: $scope.breweries[i].latitude,
          longitude: $scope.breweries[i].longitude,
        },
        options: {
          title: name,
        },
        infoWindow: {
          content: desc,
          maxWidth: 500
        },
        icon: '/modules/nearby/images/beer-icon.png',
        showWindow: false
      };
      ret.onClick = function() {
        if ($scope.oldWindow > -1) {
          $scope.allMarkers[$scope.oldWindow].showWindow = false;
        }
        $scope.oldWindow = ret.id;
        ret.showWindow = !ret.showWindow;
      };

      return ret;
    };

    // create markers for all breweries
    var placeMarker = function() { // places all the brewery markers
      var markers = [];
      for (var i = 0; i < $scope.breweries.length; i++) {
        markers.push(createMarker(i));
      }
      $scope.allMarkers = markers;
    };

    // update radius and circle
    var updateRadius = function() {
      bounds = $scope.map.bounds;
      radius = Core.calculateRadius(bounds);
      // $scope.circle = {
      //   id: 1,
      //   center: $scope.map.center, 
      //   radius: radius,
      //   stroke: {
      //       color: '#1ABC9C',
      //       weight: 2,
      //       opacity: 1
      //   },
      //   fill: {
      //       color: '#1ABC9C',
      //       opacity: 0.5
      //   }
      // };
    };

    $scope.getUserLocation = function(){
        // function to access users geolocation coordinates, draw map and place markers
      geolocation.getLocation().then(function(data){
        $scope.coords = {
          latitude: data.coords.latitude, 
          longitude: data.coords.longitude
        };

        uiGmapGoogleMapApi.then(function(maps) {
          $scope.map = { 
            center: { 
              latitude: $scope.coords.latitude, 
              longitude: $scope.coords.longitude 
            }, 
            zoom: 14,
            bounds: {},
            events: {
              idle: function() {
                uiGmapIsReady.promise().then(function() {
                  updateRadius();
                  var dbRadius = radius / 1000;
                  Breweries.getData($scope.map.center, dbRadius).success(handleSuccess); // get brewery data from factory
                });
              }
            }
          };

          curLocationMarker(); // add marker for current location
        });

        uiGmapIsReady.promise().then(function() {
          updateRadius();
          var dbRadius = radius / 1000;
          Breweries.getData($scope.map.center, dbRadius).success(handleSuccess); // get brewery data from factory
        });
      });
    };

  }
]);
