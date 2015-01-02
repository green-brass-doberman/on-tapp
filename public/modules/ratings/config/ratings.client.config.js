'use strict';

// Configuring the Articles module
angular.module('ratings').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Ratings', 'ratings', 'dropdown', '/ratings(/create)?');
		Menus.addSubMenuItem('topbar', 'ratings', 'List Ratings', 'ratings');
		Menus.addSubMenuItem('topbar', 'ratings', 'New Rating', 'ratings/create');
	}
]);