'use strict';

angular.module('beer').factory('StyleQuery', ['$http',
  function($http) {
    // Stylequery service logic
    // ...

    // Public API
    return {
      getStyle: function(styleName) {
        return $http.get('/style/' + styleName);
      }
    };
  }
]);
