'use strict';

//Ratings service used to communicate Ratings REST endpoints
angular.module('ratings').factory('Ratings', ['$resource',
  function($resource) {
    return $resource('/api/ratings/:ratingId', {
      ratingId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
