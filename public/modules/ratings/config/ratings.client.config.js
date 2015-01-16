'use strict';

// Configuring the Articles module
angular.module('ratings').run(['Menus',
  function(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Recommendations', 'recommendations', '/ratings(/create)?');
  }
]);
