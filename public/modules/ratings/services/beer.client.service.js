'use strict';

angular.module('beers').factory('Beer', ['$http',
  function($http) {
    // Public API
    return {
      getData: function(beerId){
        return $http.get('/beer/' + beerId);
      }
    };
  }
]);
