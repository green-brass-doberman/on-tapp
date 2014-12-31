'use strict';

angular.module('beers').controller('BeersController', ['$scope', 'Beers', '$stateParams',
	function($scope, Beers, $stateParams) {

    // sort the given collection on the given property
    function sortOn(collection, name) {
      collection.sort(
        function(a, b) {
          if (a[name] <= b[name]) {
            return(-1);
          }
          return(1);
        }
      );
    }

    // group the beers list on the given property
    $scope.groupBy = function(attribute) {
      // First, reset the groups.
      $scope.groups = [];

      // Now, sort the collection of beers on the grouping-property. 
      // This just makes it easier to split the collection.
      sortOn($scope.beers, attribute);

      // I determine which group we are currently in.
      var groupValue = "_INVALID_GROUP_VALUE_";

      // As we loop over each beer, add it to the current group -
      // we'll create a NEW group every time we come across a new attribute value.
      for (var i = 0; i < $scope.beers.length; i++) {
        var beer = $scope.beers[i];

        // Should we create a new group?
        if (beer[attribute] !== groupValue) {
          var group = {
            label: beer[attribute],
            beers: []
          };
          groupValue = group.label;
          $scope.groups.push(group);
        }

        // Add the friend to the currently active grouping.
        group.beers.push(beer);
      }
    };

    $scope.beers = [];
    $scope.groups = [];
    $scope.breweryId = $stateParams.breweryId;

    var handleSuccess = function(data, status){
      $scope.beers = data.data;
      $scope.groupBy('availableId');
    };

    // send the brewery id
    Beers.getData($scope.breweryId).success(handleSuccess);

    // $scope.status = {
    //   isItemOpen: new Array($scope.beers.length),
    //   isFirstDisabled: false
    // };

    // $scope.status.isItemOpen[0] = true;
	}
]);
