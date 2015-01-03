'use strict';

// Ratings controller
angular.module('ratings').controller('RatingsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ratings',
	function($scope, $stateParams, $location, Authentication, Ratings) {
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
		};
	}
]);
