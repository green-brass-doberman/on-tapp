'use strict';

angular.module('beer').factory('Beer', ['$http',
  function($http) {
    // Public API
    return {
      getData: function(beerId){
        return $http.get('/api/beer/' + beerId);
      }
    };
  }
]);
