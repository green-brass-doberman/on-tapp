'use strict';

//Setting up route
angular.module('beers').config(['$stateProvider',
	function($stateProvider) {
		// Beers state routing
		$stateProvider.
		state('beer', {
			url: '/beer/:beerId',
			templateUrl: 'modules/beers/views/beer.client.view.html'
		}).
		state('beers', {
			url: '/beers/:breweryId',
			templateUrl: 'modules/beers/views/beers.client.view.html'
		});
	}
]);
