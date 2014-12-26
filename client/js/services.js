angular.module('onTappApp.services', [])
  .factory('breweries', function($http){
    var data = {
      breweries: [
        {name:'XXXX Brewery', description: 'Founded in 2015, it has the best beer in the world.', distance: 100, ratings: 0},
        {name:'YYYY Brewery', description: 'Founded in 1915, it has the worst beer in the world.', distance: 200, ratings: 0},
        {name:'ZZZZ Brewery', description: 'Founded in 1815, it no longer brews any beer for the world.',  distance: 300, ratings: 0}
      ]};

    $http.get('/api')
    .success(function(data, status, headers, config) {
      console.log(data);
    })
    .error(function(data, status, headers, config) {
      console.log(data);
    });
    return data;
  });
