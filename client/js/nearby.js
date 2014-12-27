angular.module('onTappApp.nearby', ['uiGmapgoogle-maps', 'geolocation'])

  .controller('NearByController', ['$scope', 'breweries', 'geolocation', function($scope, breweries, geolocation) {
    $scope.breweries = [];

    var handleSuccess = function(data, status){
      $scope.breweries = data.data;
      placeMarker();
    };

    breweries.getData().success(handleSuccess);

    $scope.status = {
      isItemOpen: new Array($scope.breweries.length),
      isFirstDisabled: false
    };

    $scope.status.isItemOpen[0] = true;

    // render Google map and set center at San Francisco by default
    $scope.map = { center: { latitude: 37.7833, longitude: -122.4167 }, zoom: 12};

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

    $scope.getCurrentLocation = function(){
      geolocation.getLocation().then(function(data){
        $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
        $scope.map = { center: { latitude: data.coords.latitude, longitude: data.coords.longitude }, zoom: 12};
      });
    };
  }]);
