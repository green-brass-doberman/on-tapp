'use strict';

angular.module('beers').controller('BeersController', ['$scope', 'Beers', '$stateParams',
	function($scope, Beers, $stateParams) {
		// Controller Logic
		// ...

    $scope.beers = [];
    $scope.breweryId = $stateParams.breweryId;

    var handleSuccess = function(data, status){
      $scope.beers = data.data;
    };

    // send the brewery id
    Beers.getData($scope.breweryId).success(handleSuccess);

    $scope.status = {
      isItemOpen: new Array($scope.beers.length),
      isFirstDisabled: false
    };

    $scope.status.isItemOpen[0] = true;
	}
]);
