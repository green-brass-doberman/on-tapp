'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', 'Search',
  function($scope, Authentication, Menus, Search) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');

    $scope.searchData = {};
    var handleSearchSuccess = function(data, status){
      $scope.searchData = data.data;
    };
    $scope.searchRequest = function(name) {
      Search.getData(name).success(handleSearchSuccess);
    }

    $scope.toggleCollapsibleMenu = function() {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function() {
      $scope.isCollapsed = false;
    });

  }
]);