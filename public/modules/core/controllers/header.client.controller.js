'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', 'allBeers', 'allBreweries',
	function($scope, Authentication, Menus, allBeers, allBreweries) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.selected = '';
		var saveData = [];

    $scope.beersAndBreweries = [];
    var handleBeerSuccess = function(data, status){
      //$scope.allBeers = data.data;
      saveData = data.data;
      for (var j=0; j<saveData.length; j++) {
       	$scope.beersAndBreweries.push({name: saveData[j].name, type: 'beer', id: saveData[j].id});
      }
    };
    // send the brewery id
    allBeers.getData('mtUjck').success(handleBeerSuccess);

    $scope.coords = {lat:37.7833, long:-122.4167};
    var handleBrewerySuccess = function(data, status){
      //$scope.allBreweries = data.data;
      saveData = data.data;
      for (var j=0; j<saveData.length; j++) {
      	$scope.beersAndBreweries.push({name: saveData[j].brewery.name, type: 'brewery', id: saveData[j].breweryId});
      }
    };
    allBreweries.getData($scope.coords).success(handleBrewerySuccess);

    $scope.imageSource = function(item) {
        return item.images['medium'];
    };

    $scope.isBeer = function() {
        return $scope.beersAndBreweries.length > 0;
    };

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

	}
]);