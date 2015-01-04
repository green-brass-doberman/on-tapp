'use strict';

angular.module('search').factory('Search', ['$http',
	function($http) {
		// Public API
		return {
      getData: function(item){
        return $http.get('/search/' + item);
      }
    };
	}
]);