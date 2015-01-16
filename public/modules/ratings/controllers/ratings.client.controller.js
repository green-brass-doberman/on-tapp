'use strict';

// Ratings controller
angular.module('ratings').controller('RatingsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ratings', 'StyleQuery', 'PredictionIO', 'Beer',
  function($scope, $stateParams, $location, Authentication, Ratings, StyleQuery, PredictionIO, Beer) {
    $scope.authentication = Authentication;

    // Remove existing Rating
    $scope.remove = function(rating) {
      if ( rating ) {
        rating.$remove();

        for (var i in $scope.ratings) {
          if ($scope.ratings [i] === rating) {
            $scope.ratings.splice(i, 1);
          }
        }
      } else {
        $scope.rating.$remove(function() {
          $location.path('ratings');
        });
      }
    };

    // Update existing Rating
    $scope.update = function() {
      var rating = $scope.rating;

      rating.$update(function() {
        $location.path('ratings/' + rating._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Ratings
    $scope.find = function() {
      $scope.ratings = Ratings.query();


      var userId = Authentication.user._id;

      $scope.ratings.$promise.then(function(data){
        getPredition(userId);
      });
    };

    // Find existing Rating
    $scope.findOne = function() {
      $scope.rating = Ratings.get({
        ratingId: $stateParams.ratingId
      });

      $scope.rating.$promise.then(function(data) {
        getStars(data.stars);
        getRecommendations(data.styleName);
        getPredition(data.user._id);
        getBeerDetails(data.beerId);
      });
    };

    //an array to store number of stars
    $scope.stars = [];

    // get the number of stars
    var getStars = function(noOfStars){
      // for (var i = 0; i < noOfStars; i++) {
      //   $scope.stars.push(i);
      // }
      $scope.stars = noOfStars;
    };

    // Find the beers in the same category
    var getRecommendations = function(styleName){
      StyleQuery.getStyle(styleName).success(handleSuccess);
    };

    $scope.itemScores = [];

    // get result for PreditionIO
    var getPredition = function(userId){
      PredictionIO.getRecommendaton(userId).success(function(data, status){

        Beer.getData(data.itemScores[0].item).success(function(data, status){
          $scope.itemScores = [data.data];
        });
      });
    };

    $scope.beer = {};

    var getBeerDetails = function(beerId){
      Beer.getData(beerId).success(function(results, status) {
        $scope.beer = results.data || 'Request failed';
      });
    };

    // an array to store recommendations
    $scope.recommendations = [];

    // pushing recommendations data from $http request
    var handleSuccess = function(data, status){
      $scope.recommendations = data.data;
    };
  }
]);
