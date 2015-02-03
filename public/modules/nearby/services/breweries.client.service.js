'use strict';

angular.module('nearby').factory('Breweries', ['$http',
  function($http) {
    // Public API
    return {
      getData: function(coords, radius){
        return $http.get('/api/breweries/' + coords.latitude + '/' + coords.longitude + '/' + radius);
      }
    };
  }
]);
