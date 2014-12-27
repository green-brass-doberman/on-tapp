angular.module('onTappApp.nearby', ['uiGmapgoogle-maps', 'geolocation'])

  .controller('NearByController', ['$scope', 'breweries', 'geolocation', function($scope, breweries, geolocation) {
    $scope.breweries = [];

    var handleSuccess = function(data, status){
      $scope.breweries = data.data;
      console.log($scope.breweries);
    };

    breweries.getData().success(handleSuccess);

    $scope.status = {
      isItemOpen: new Array($scope.breweries.length),
      isFirstDisabled: false
    };

    $scope.status.isItemOpen[0] = true;

    // render Google map and set center at San Francisco by default
    $scope.map = { center: { latitude: 37.7833, longitude: -122.4167 }, zoom: 8 };

    $scope.options = {scrollwheel: false};

    $scope.marker = {
      id: 0,
      coords: {
        latitude: 37.7833,
        longitude: -122.4167
      },
      options: { draggable: false }
    };

    $scope.windowOptions = {
      visible: false
    };

    $scope.onClick = function() {
      $scope.windowOptions.visible = !$scope.windowOptions.visible;
    };

    $scope.closeClick = function() {
      $scope.windowOptions.visible = false;
    };

    $scope.title = 'XXXX Brewery';

    $scope.getCurrentLocation = function(){
      geolocation.getLocation().then(function(data){
        $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
      });
    };
  }]);
