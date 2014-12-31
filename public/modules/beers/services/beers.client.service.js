'use strict';

angular.module('beers').factory('Beers', ['$http',
	function($http) {
		// Public API
		return {
      getData: function(breweryId){
        return $http.get('/beers/' + breweryId);
      }
    };
	}
]);
