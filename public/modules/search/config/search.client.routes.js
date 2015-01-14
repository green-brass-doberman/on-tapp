'use strict';

//Setting up route
angular.module('search').config(['$stateProvider',
  function($stateProvider) {
    // Ratings state routing
    $stateProvider.
    state('search', {
      url: '/search/:page/:keyword',
      templateUrl: 'modules/search/views/search.client.view.html'
    });
  }
]);
