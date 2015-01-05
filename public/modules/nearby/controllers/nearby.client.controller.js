'use strict';

angular.module('nearby').controller('NearbyController', ['$scope', 'Breweries', 'geolocation', '$stateParams', 'uiGmapLogger',
	function($scope, Breweries, geolocation, $stateParams, uiGmapLogger) {
		// Controller Logic
		// ...

    // enable logging of google map info and error
    uiGmapLogger.doLog = true;

    // this array would be used to fetch data from brewerydb factory
    $scope.breweries = [];

    // an object to story user's current coordinate, set to san francisco by Default
    $scope.coords = {lat:37.7833, long:-122.4167};

    // initialize the Google map
    $scope.map = { center: { latitude: $scope.coords.lat, longitude: $scope.coords.long }, zoom: 12};

    // pushing breweries data from $http request and place markers
    var handleSuccess = function(data, status){
      $scope.breweries = data.data;
      placeMarker();
    };

    // get Breweries data from factory
    $scope.getBreweries = function(){
      Breweries.getData($scope.coords).success(handleSuccess);
    };

    // function to access users geolocation coordinates
    $scope.getCurrentLocation = function(){
      geolocation.getLocation().then(function(data){
        $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};

        $scope.map = { center: { latitude: $scope.coords.lat, longitude: $scope.coords.long }, zoom: 11};

        curLocationMarker();

        $scope.getBreweries();
      });
    };

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
        icon: '/modules/nearby/images/beer-icon.png',
        show: false
      };
      ret.onClick = function() {
        ret.show = !ret.show;
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

    // dropdown menu to select States
    $scope.items = [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming'
    ];

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function(open) {
      $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
  }
]);
