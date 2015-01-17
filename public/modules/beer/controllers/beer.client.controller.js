'use strict';

angular.module('beer').controller('BeerController', ['$scope', 'Beer', '$stateParams', 'StyleQuery',
  function($scope, Beer, $stateParams, StyleQuery) {
    // Beer controller logic
    $scope.beerId = $stateParams.beerId;

    // an array to store recommendations
    $scope.recommendations = [];

    var shuffle = function (array) {
      var currentIndex = array.length, temporaryValue, randomIndex ;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };

    // pushing recommendations data from $http request
    var handleSuccess = function(data, status){
      $scope.recommendations = shuffle(data.data);
    };

    // Find the beers in the same category
    var getRecommendations = function(styleName){
      StyleQuery.getStyle(styleName).success(handleSuccess);
    };

    Beer.getData($scope.beerId).success(function(results, status) {
      $scope.beer = results.data || 'Request failed';
      getRecommendations(results.data.style.name);
    });
  }
]);
