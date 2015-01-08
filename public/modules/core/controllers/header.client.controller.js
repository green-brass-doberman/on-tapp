'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$state',
  function($scope, Authentication, Menus, $state) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');

    $scope.toggleCollapsibleMenu = function() {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function() {
      $scope.isCollapsed = false;
    });

    // Search logic
    $scope.results = [];
    $scope.totalResults = undefined;
    
    $scope.search = function(currentPage) {
      currentPage = currentPage || 1;
      $state.go('search', {'page': currentPage, 'keyword': $scope.keyword, 'searchtype': $scope.searchType});
    }
  }
]);