'use strict';

angular.module('ratings').factory('StyleQuery', ['$http',
  function($http) {
    // Stylequery service logic
    // ...

    // Public API
    return {
      getStyle: function(styleName) {
        return $http.get('/api/style/' + styleName);
      }
    };
  }
]);
