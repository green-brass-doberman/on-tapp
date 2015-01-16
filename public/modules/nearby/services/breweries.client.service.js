'use strict';

angular.module('nearby').factory('Breweries', ['$http',
  function($http) {
    // Public API
    return {
      getData: function(coords){
        return $http.get('/api/breweries/' + coords.lat + '/' + coords.long);
      }
    };
  }
]);
