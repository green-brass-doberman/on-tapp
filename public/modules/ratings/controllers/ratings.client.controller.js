'use strict';

angular.module('ratings').controller('RatingsController', ['$scope', 'Breweries', '$firebase',
	function($scope, breweries, $firebase) {
		// Controller Logic
		// ...

    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;

    var allBreweries = [];

    var handleSuccess = function(data, status){
      allBreweries = data.data;
      $scope.addSlide();
    };

    breweries.getData().success(handleSuccess);

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
      {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    ];

    $scope.myInterval = 0;

    var slides = $scope.slides = [];

    $scope.addSlide = function() {
      var newWidth = 600 + slides.length + 1;

      for (var i = 0; i < allBreweries.length; i++) {
          slides.push({
          image: 'data:image/gif;base64,R0lGODlhAQABAIAAAGZmZgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
          text: allBreweries[i].brewery.name
        });
      }
    };

    $scope.addSlide();

    $scope.saveRating = function(){
      var brewery = allBreweries[0];
      brewery.ratings = $scope.percent;
    };

    // connect to firebase
    var ref = new Firebase('https://on-tapp.firebaseio.com/ratings');

    var fb = $firebase(ref);

    // function to set the default data
    $scope.reset = function() {

      $scope.rate = 0;

      fb.$set({
        xxxx: {
          name: 'XXXX Brewery',
          ratings: {
            stars: {
              number: '0',
              rated: false
            }
          }
        },
        yyyy: {
          name: 'YYYY Brewery',
          ratings: {
            stars: {
              number: '0',
              rated: false
            }
          }
        }
      });

    };

    // sync as object
    var syncObject = fb.$asObject();

    // three way data binding
    syncObject.$bindTo($scope, 'ratings');

	}
]);
