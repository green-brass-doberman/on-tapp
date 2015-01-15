'use strict';

angular.module('nearby').controller('BreweryController', ['$scope', 'Brewery', '$stateParams', 'Ratings', '$location',
  function($scope, Brewery, $stateParams, Ratings, $location) {
    // Brewery controller logic
    $scope.breweryId = $stateParams.breweryId;
    var holdSocial = [];

    Brewery.getData($scope.breweryId).success(function(results, status) {
      $scope.brewery = results.data || 'Request failed';
      if ($scope.brewery.socialAccounts !== undefined) {
        for (var i = 0; i < $scope.brewery.socialAccounts.length; i++) {
          // only save the social media sites that are FB, Twitter, 4Square,
          // Google+, YouTube, Instagram, Yelp or Pinterest
          var tempSocial = $scope.brewery.socialAccounts[i];
          if ([1,2,3,8,10,14,15,16].indexOf(tempSocial.socialMediaId) > -1) {
            holdSocial.push(tempSocial);
          }
        }
        $scope.socialMedia = holdSocial;
      }
    });

    // sort the given collection on the given property
    function sortOn(collection, name) {
      collection.sort(
        function(a, b) {
          if (a[name] <= b[name]) {
            return(-1);
          }
          return(1);
        }
      );
    }

    // group the beers list on the given property
    $scope.groupBy = function(attribute) {
      // First, reset the groups.
      $scope.groups = [];

      // Now, sort the collection of beers on the grouping-property.
      // This just makes it easier to split the collection.
      sortOn($scope.beers, attribute);

      // I determine which group we are currently in.
      var groupValue = '_INVALID_GROUP_VALUE_';

      // As we loop over each beer, add it to the current group -
      // we'll create a NEW group every time we come across a new attribute value.
      for (var i = 0; i < $scope.beers.length; i++) {
        var beer = $scope.beers[i];

        var group;

        // Should we create a new group?
        if (beer[attribute] !== groupValue) {
          group = {
            label: beer[attribute],
            beers: []
          };
          groupValue = group.label;
          $scope.groups.push(group);
        }

        // Add the friend to the currently active grouping.
        group.beers.push(beer);
      }
    };

    $scope.beers = [];
    $scope.groups = [];
    $scope.breweryId = $stateParams.breweryId;

    var handleSuccess = function(data, status){
      $scope.beers = data.data;
      $scope.groupBy('availableId');
    };

    // send the brewery id
    Brewery.getBeersData($scope.breweryId).success(handleSuccess);

    // handle the stars rating
    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;

    // hoveing over on ratings stars
    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

    // set the ratings stars
    $scope.ratingStates = [
      {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    ];

    // Create new Rating
    $scope.create = function(index) {

      // Create new Rating object
      var rating = new Ratings ({
        beerId: $scope.beers[index].id,
        name: $scope.beers[index].name,
        stars: this.rate,
        styleName: $scope.beers[index].style.name
      });

      // Redirect after save
      rating.$save(function(response) {
        console.log('this is the response', response);
        // $location.path('ratings/' + response._id);
        $location.path('beer/' + response.beerId);

        // Clear form fields
        $scope.name = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
