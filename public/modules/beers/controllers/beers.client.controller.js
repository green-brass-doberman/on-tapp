'use strict';

angular.module('beers').controller('BeersController', ['$scope', 'beers', '$stateParams',
	function($scope, beers, $stateParams) {
		// Controller Logic
		// ...

    $scope.beers = [];
    $scope.breweryId = $stateParams.breweryId;

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
	}
]);
