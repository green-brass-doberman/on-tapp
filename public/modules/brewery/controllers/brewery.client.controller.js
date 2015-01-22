'use strict';

angular.module('nearby').controller('BreweryController', ['$scope', 'Brewery', '$stateParams', 'Ratings', '$location', 'Core',
  function($scope, Brewery, $stateParams, Ratings, $location, Core) {
    // Brewery controller logic
    $scope.breweryId = $stateParams.breweryId;
    $scope.brewery = [];
    $scope.socialMedia = [];
    var socialMediaArr = [1,2,3,8,10,14,15,16];

    // send the brewery id and get the brewery information
    Brewery.getData($scope.breweryId).success(function(data, status) {
      $scope.brewery = data.data || 'Request failed';

      // if there are locations, abbreviate the states
      if ($scope.brewery.locations !== undefined) {
        for (var i = 0; i < $scope.brewery.locations.length; i++) {
          $scope.brewery.locations[i].region = Core.abbrState($scope.brewery.locations[i].region);
          if ($scope.brewery.locations[i].phone.indexOf('-') === -1) {
            $scope.brewery.locations[i].phone = Core.fixPhone($scope.brewery.locations[i].phone);
          }
        }
      }

      // only get social media info for certain sites
      if ($scope.brewery.socialAccounts !== undefined) {
        for (var j = 0; j < $scope.brewery.socialAccounts.length; j++) {
          var tempSocial = $scope.brewery.socialAccounts[j];
          if (socialMediaArr.indexOf(tempSocial.socialMediaId) > -1) {
            $scope.socialMedia.push(tempSocial);
          }
        }
      }
    });

    $scope.beers = [];
    $scope.availabilityGroups = [];
    // send the brewery id and get all the beers
    Brewery.getBeersData($scope.breweryId).success(function(data, status) {
      $scope.beers = data.data || 'Request failed';
      $scope.availabilityGroups = uniqueItems($scope.beers);
    });

    $scope.useAvailability = [];
    $scope.filterBeer = function() {
      return function(p) {
        if (($scope.useAvailability.length === 0) || ($scope.useAvailability.indexOf(true) === -1)) {
          return true;
        }
        for (var i in $scope.useAvailability) {
          if (p.availableId === $scope.availabilityGroups[i].availableId && $scope.useAvailability[i]) {
            return true;
          }
        }
      };
    };

    // handle the stars rating
    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;
    var index;

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

      console.log('index before: ', index);
      // index = Core.findIndexByKeyValue($scope.beers, 'id', beerId);
      // console.log('index after: ', index);
      // console.log('beerId: ', beerId);
      // Create new Rating object
      var rating = new Ratings ({
        beerId: $scope.beers[index].id,
        name: $scope.beers[index].name,
        stars: this.rate,
        styleName: $scope.beers[index].style.name
      });
      console.log('rating.beerId: ', rating.beerId);

      // Redirect after save
      rating.$save(function(response) {
        // console.log('this is the response', response);
        // $location.path('ratings/' + response._id);
        $location.path('beer/' + response.beerId);

        // Clear form fields
        $scope.name = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    var uniqueItems = function(data) {
      var result = [];
      for (var i = 0; i < data.length; i++) {
        var idx = data[i].availableId;
        if (idx !== undefined) {
          var aName = data[i].available.name;
          if (Core.findIndexByKeyValue(result, 'availableId', idx) === -1) {
              result.push({'availableId': idx, 'availableName': aName});
          }
        }
      }
      result.sort(function(a, b) {
        if (a.availableId > b.availableId) {
          return 1;
        }
        if (a.availableId < b.availableId) {
          return -1;
        }
        return 0; // a must be equal to b
      });
      return result;
    };
  }
]);
