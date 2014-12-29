'use strict';

//Setting up route
angular.module('nearby').config(['$stateProvider',
	function($stateProvider) {
		// Nearby state routing
		$stateProvider.
		state('nearby', {
			url: '/nearby',
			templateUrl: 'modules/nearby/views/nearby.client.view.html'
		});
	}
]);