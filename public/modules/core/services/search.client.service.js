'use strict';

angular.module('core').factory('Search', ['$http',
  function($http) {
    // Public API
    return {
      getData: function(keyword, page){
        return $http.get('/api/search/' + keyword + '/' + page);
      }
    };
  }
]);
