angular.module('onTappApp.services', [])
  .factory('breweries', function($http){
    return {
      getData: function(coords){
        return $http.get('/breweries/' + coords.lat + '/' + coords.long);
      }
    };
  })

  .factory('beers', function($http){
    return {
      getData: function(breweryId){
        return $http.get('/beers/' + breweryId);
      }
    };
  });
