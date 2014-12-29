'use strict';

angular.module('beers').factory('Beers', [
	function($http) {
		// Beers service logic
		// ...

		// Public API
		return {
      getData: function(breweryId){
        return $http.get('/beers/' + breweryId);
      }
    };
	}
]);
