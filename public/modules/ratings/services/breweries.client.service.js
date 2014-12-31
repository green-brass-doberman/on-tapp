'use strict';

angular.module('ratings').factory('Breweries', ['$http',
	function($http) {
		// Breweries service logic
		// ...

		// Public API
		return {
      getData: function(coords){
        return $http.get('/breweries/' + coords.lat + '/' + coords.long);
      }
    };
	}
]);
