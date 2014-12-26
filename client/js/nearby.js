angular.module('onTappApp.nearby', [])

  .controller('NearByController', ['$scope', 'breweries', function($scope, breweries) {
    $scope.breweries = breweries.breweries;

    $scope.status = {
        isItemOpen: new Array($scope.breweries.length),
        isFirstDisabled: false
      };

    $scope.status.isItemOpen[0] = true;

    // render Google map and set center at San Francisco by default
    $scope.map = { center: { latitude: 37.7833, longitude: -122.4167 }, zoom: 8 };
  }]);
