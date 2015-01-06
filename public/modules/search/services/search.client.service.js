'use strict';

angular.module('search').factory('Search', ['$http',
	function($http) {
		// Public API
		return {
      getData: function(keyword, page){
        return $http.get('/search/' + keyword + '/' + page);
      }
    };
	}
]);