angular.module('onTappApp.services', [])
  .factory('breweries', function($http){
    return {
      getData: function(){
        return $http.get('/breweries');
      }
    };
  })

  .factory('beers', function($http){
    return {
      getData: function(){
        return $http.get('/beers');
      }
    };
  });
