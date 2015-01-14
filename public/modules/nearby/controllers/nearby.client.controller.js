'use strict';

angular.module('nearby').controller('NearbyController', ['$scope', 'uiGmapGoogleMapApi', 'Breweries', 'geolocation', 'uiGmapLogger', 'usSpinnerService',
	function($scope, uiGmapGoogleMapApi, Breweries, geolocation, uiGmapLogger, usSpinnerService) {

    // enable logging of google map info and error
    uiGmapLogger.doLog = true;

    $scope.breweries = []; // used to fetch data from brewerydb factory
    $scope.coords = {}; // user's current coordinates
    $scope.allMarkers = []; // array to store the brewery markers

    // pushing breweries data from $http request and place markers
    var handleSuccess = function(data, status){
      if (data.data){
        $scope.breweries = data.data;
          placeMarker();
      } else {
        $scope.breweries = [{
          brewery: {
            name: 'Sorry',
            description: 'No breweries nearby'
          }
        }];
      }
      usSpinnerService.stop('spinner-1'); //stop the spinner
    };

    // function to access users geolocation coordinates, draw map and place markers
    geolocation.getLocation().then(function(data){
      // set to san francisco by Default for Victor
      // $scope.coords = {lat:37.783973, long:-122.409100};

      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
      $scope.map = { center: { latitude: $scope.coords.lat, longitude: $scope.coords.long }, zoom: 12}; // initialize the Google map
      $scope.windowOptions = {    
        visible: true   
      };
      curLocationMarker(); // add marker for current location
      Breweries.getData($scope.coords).success(handleSuccess); // get brewery data from factory
    });

    // marker for current coordinate
    var curLocationMarker = function(){
      $scope.marker = {
        id: 'curLoc',
        coords: {
          latitude: $scope.coords.lat,
          longitude: $scope.coords.long,
        },
        options: {
          title: 'You are here!'
        }
      };
    };

    var createMarker = function (i) {
      // var hours = $scope.breweries[i].hoursOfOperation || '';
      // hours = hours.replace(/\n/g, "<br>");
      var name = $scope.breweries[i].brewery.name;
      var addr = $scope.breweries[i].streetAddress;
      var phone = $scope.breweries[i].phone;
      var id = $scope.breweries[i].brewery.id;
      var dist = $scope.breweries[i].distance;
      var desc = '<a href="#!/brewery/' + id + '"><strong>' + name + '</strong></a><br>' + dist + ' miles away<br>' + addr + '<br>' + phone + '<br>' + '<a href="#!/beers/' + id + '">List their beers</a>';
      var ret = {
        id: i,
        breweryId: id,
        latitude: $scope.breweries[i].latitude,
        longitude: $scope.breweries[i].longitude,
        options: {
          title: name,
        },
        title: desc,
        icon: '/modules/nearby/images/beer-icon.png',
        showWindow: false
      };
      ret.onClick = function() {
        ret.show = !ret.show;
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

    $scope.closeClick = function() {
      $scope.windowOptions.visible = false;
    };

    $scope.getUserLocation = function(){
        // function to access users geolocation coordinates, draw map and place markers
      geolocation.getLocation().then(function(data){
        // set to san francisco by Default for Victor
        $scope.coords = {lat:37.783973, long:-122.409100};

        // $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
        $scope.map = { center: { latitude: $scope.coords.lat, longitude: $scope.coords.long }, zoom: 12}; // initialize the Google map
        $scope.windowOptions = {
          visible: true
        };
        curLocationMarker(); // add marker for current location
        Breweries.getData($scope.coords).success(handleSuccess); // get brewery data from factory
      });
    };
  }
]);
