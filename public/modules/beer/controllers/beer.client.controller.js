'use strict';

angular.module('beer').controller('BeerController', ['$scope', 'Beer', '$stateParams', 'StyleQuery',
	function($scope, Beer, $stateParams, StyleQuery) {
		// Beer controller logic
    $scope.beerId = $stateParams.beerId;

    // an array to store recommendations
    $scope.recommendations = [];

    // pushing recommendations data from $http request
    var handleSuccess = function(data, status){
      console.log(data.data);
      $scope.recommendations = data.data;
    };

    // Find the beers in the same category
    var getRecommendations = function(styleName){
      StyleQuery.getStyle(styleName).success(handleSuccess);
    };

    Beer.getData($scope.beerId).success(function(results, status) {
      $scope.beer = results.data || 'Request failed';
      getRecommendations(results.data.style.name);
    });
	}
]);
