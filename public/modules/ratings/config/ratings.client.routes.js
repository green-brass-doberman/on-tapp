'use strict';

//Setting up route
angular.module('ratings').config(['$stateProvider',
	function($stateProvider) {
		// Ratings state routing
		$stateProvider.
		state('listRatings', {
			url: '/ratings',
			templateUrl: 'modules/ratings/views/list-ratings.client.view.html'
		}).
		state('createRating', {
			url: '/ratings/create',
			templateUrl: 'modules/ratings/views/create-rating.client.view.html'
		}).
		state('viewRating', {
			url: '/ratings/:ratingId',
			templateUrl: 'modules/ratings/views/view-rating.client.view.html'
		}).
		state('editRating', {
			url: '/ratings/:ratingId/edit',
			templateUrl: 'modules/ratings/views/edit-rating.client.view.html'
		});
	}
]);