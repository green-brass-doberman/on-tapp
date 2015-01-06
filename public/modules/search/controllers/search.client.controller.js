'use strict';

angular.module('search').controller('SearchController', ['$scope', 'Search',
  function($scope, Search) {
    // Search controller logic
    $scope.results = [];
    $scope.totalResults = undefined;
    
    $scope.search = function(currentPage) {
      $scope.currentPage = currentPage || 1;
      $scope.results = [];
      $scope.searchword = $scope.searchword || $scope.keyword;
      Search.getData($scope.searchword, $scope.currentPage).success(function(results, status) {
        if (status === 200) {
          $scope.keyword = null;
          $scope.status = status;
          if (results.totalResults !== undefined) {
            $scope.numberOfPages = results.numberOfPages;
            $scope.totalResults = results.totalResults;
            $scope.results = results.data;
          } else {
            $scope.totalResults = 0;
            $scope.numberOfPages = 0;
          }
        } else {
          $scope.results = results || 'Request failed';
          $scope.status = status;
        }
      });
    };
  }
]);