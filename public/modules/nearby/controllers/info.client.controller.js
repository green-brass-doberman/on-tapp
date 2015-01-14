'use strict';

angular.module('nearby').controller('infoWindowController', ['$scope', '$stateParams', 
  function($scope, $stateParams) {
    $scope.params = $stateParams;
  }
]);