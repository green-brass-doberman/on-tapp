angular.module('onTappApp.beers', [])

  .controller('BeersController', ['$scope', 'beers', function($scope, beers) {

    $scope.beers = [];

    var handleSuccess = function(data, status){
      $scope.beers = data.data;
    };

    beers.getData().success(handleSuccess);

    $scope.status = {
      isItemOpen: new Array($scope.beers.length),
      isFirstDisabled: false
    };

    $scope.status.isItemOpen[0] = true;

  }]);
