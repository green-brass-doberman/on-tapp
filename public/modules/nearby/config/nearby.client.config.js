'use strict';

// Configuring the Articles module
angular.module('nearby').run(['Menus',
  function(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Breweries Nearby', 'nearby', '/nearby');
  }
]);
