'use strict';

angular.module('beers').controller('BeerController', ['$scope', 'Beer', '$stateParams', 
	function($scope, Beer, $stateParams) {
		// Beer controller logic
    $scope.beerId = $stateParams.beerId;
    
    Beer.getData($scope.beerId).success(function(results, status) {
      $scope.beer = results.data || 'Request failed';
    });
	}
]);