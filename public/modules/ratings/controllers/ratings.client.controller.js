'use strict';

angular.module('ratings').controller('RatingsController', ['$scope', 'Breweries',
	function($scope, breweries) {
		// Controller Logic
		// ...

    var allBreweries = [];

    var handleSuccess = function(data, status){
      allBreweries = data.data;
      $scope.addSlide();
    };

    breweries.getData({lat:37.7833, long:-122.4167}).success(handleSuccess);

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

	}
]);
