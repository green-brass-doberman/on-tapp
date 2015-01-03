'use strict';

angular.module('beers').factory('Beers', ['$http', '$resource',
	function($http, $resource) {
		// Public API
		return {
      getData: function(breweryId){
        return $http.get('/beers/' + breweryId);
      }
    };
	}
]);
