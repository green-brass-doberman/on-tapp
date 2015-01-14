'use strict';

//Setting up route
angular.module('brewery').config(['$stateProvider',
  function($stateProvider) {
    // Beers state routing
    $stateProvider.
    state('brewery', {
      url: '/brewery/:breweryId',
      templateUrl: 'modules/brewery/views/brewery.client.view.html'
    });
  }
]);
