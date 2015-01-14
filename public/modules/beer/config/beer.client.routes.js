'use strict';

//Setting up route
angular.module('beer').config(['$stateProvider',
  function($stateProvider) {
    // Beers state routing
    $stateProvider.
    state('beer', {
      url: '/beer/:beerId',
      templateUrl: 'modules/beer/views/beer.client.view.html'
    });
  }
]);
