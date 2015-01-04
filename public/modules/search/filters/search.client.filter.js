'use strict';

angular.module('search').filter('search', [
	function() {
		return function(input) {
			// Search directive logic
			// ...

			return 'search filter: ' + input;
		};
	}
]);