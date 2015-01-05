'use strict';

// Ratings controller
angular.module('ratings').controller('RatingsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ratings', 'StyleQuery',
	function($scope, $stateParams, $location, Authentication, Ratings, StyleQuery) {
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
		};

		// Find existing Rating
		$scope.findOne = function() {
			$scope.rating = Ratings.get({
				ratingId: $stateParams.ratingId
			});

      $scope.rating.$promise.then(function(data) {
        getStars(data.stars);
        getRecommendations(data.styleName);
      });
		};

    //an array to store number of stars
    $scope.stars = [];

    // get the number of stars
    var getStars = function(noOfStars){
      for (var i = 0; i < noOfStars; i++) {
        $scope.stars.push(i);
      }
    };

    // Find the beers in the same category
    var getRecommendations = function(styleName){
      StyleQuery.getStyle(styleName).success(handleSuccess);
    };

    // an array to store recommendations
    $scope.recommendations = [];

    // pushing recommendations data from $http request
    var handleSuccess = function(data, status){
      $scope.recommendations = data.data;
    };
	}
]);
