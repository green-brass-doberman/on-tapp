'use strict';

angular.module('ratings').factory('PredictionIO', ['$http',
	function($http) {
		// Predictionio service logic
		// ...

		// Public API
		return {
			getRecommendaton: function(userId) {
				return $http.get('/recommendation/' + userId);
			}
		};
	}
]);
