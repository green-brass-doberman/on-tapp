'use strict';

angular.module('search').controller('SearchController', ['$scope', 'Search',
	function($scope, Search) {
		// Search controller logic
    $scope.results = [];
    // what the heck is status?
    var handleSearchSuccess = function(results, status) {
      if (status === 200) {
        $scope.currentPage = results.currentPage;
        console.log('current page: ', $scope.currentPage);
        $scope.numberOfPages = results.numberOfPages;
        console.log('number of pages: ', $scope.numberOfPages);
        $scope.totalResults = results.totalResults;
        console.log('total # of results: ', $scope.totalResults);
        $scope.results = results.data;
      }
    };
    
    $scope.searchRequest = function(name) {
      Search.getData(name).success(handleSearchSuccess);
    };
	}
]);