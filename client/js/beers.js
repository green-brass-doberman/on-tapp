angular.module('onTappApp.beers', [])

  .controller('BeersController', ['$scope', 'beers', '$routeParams', function($scope, beers, $routeParams) {

    $scope.beers = [];
    $scope.breweryId = $routeParams.breweryId;

    var handleSuccess = function(data, status){
      $scope.beers = data.data;
    };

    // send the brewery id
    beers.getData($scope.breweryId).success(handleSuccess);

    $scope.status = {
      isItemOpen: new Array($scope.beers.length),
      isFirstDisabled: false
    };

    $scope.status.isItemOpen[0] = true;

  }]);
