'use strict';

angular.module('search').controller('SearchController', ['$scope', 'Search',
  function($scope, Search) {
    // Search controller logic
    $scope.results = [];
    $scope.totalResults = 0;
    
    $scope.search = function() {
      $scope.results = [];
      Search.getData($scope.keyword).success(function(results, status) {
        if (status === 200) {
          $scope.searchword = $scope.keyword;
          $scope.keyword = null;
          $scope.currentPage = results.currentPage;
          $scope.status = status;
          if (results.totalResults !== undefined) {
            $scope.numberOfPages = results.numberOfPages;
            $scope.totalResults = results.totalResults;
            $scope.results = results.data;
          } else {
            $scope.totalResults = 0;
          }
        } else {
          $scope.results = results || 'Request failed';
          $scope.status = status;
        }
      });
    };
  }
]);