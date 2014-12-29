'use strict';

//Setting up route
angular.module('ratings').config(['$stateProvider',
	function($stateProvider) {
		// Ratings state routing
		$stateProvider.
		state('ratings', {
			url: '/ratings',
			templateUrl: 'modules/ratings/views/ratings.client.view.html'
		});
	}
]);