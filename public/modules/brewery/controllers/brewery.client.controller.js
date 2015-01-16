'use strict';

angular.module('nearby').controller('BreweryController', ['$scope', 'Brewery', '$stateParams', 'Ratings', '$location', '$filter', 'groupByFilter',
  function($scope, Brewery, $stateParams, Ratings, $location, $filter, groupByFilter) {
    // Brewery controller logic
    $scope.breweryId = $stateParams.breweryId;
    var socialMediaArr = [1,2,3,8,10,14,15,16];
    $scope.socialMedia = [];

    Brewery.getData($scope.breweryId).success(function(results, status) {
      $scope.brewery = results.data || 'Request failed';

      if ($scope.brewery.locations !== undefined) {
        for (var i = 0; i < $scope.brewery.locations.length; i++) {
          $scope.brewery.locations[i].region = abbrState($scope.brewery.locations[i].region, 'abbr');
        }
      }

      if ($scope.brewery.socialAccounts !== undefined) {
        for (var j = 0; j < $scope.brewery.socialAccounts.length; j++) {
          // only save sm sites that are FB, Twitter, 4Square, Google+, YouTube, Instagram, Yelp or Pinterest [1,2,3,8,10,14,15,16]
          var tempSocial = $scope.brewery.socialAccounts[j];
          if (socialMediaArr.indexOf(tempSocial.socialMediaId) > -1) {
            $scope.socialMedia.push(tempSocial);
          }
        }
      }
    });

    $scope.beers = [];
    $scope.availabilityGroups = [];

    var handleSuccess = function(data, status){
      $scope.beers = data.data;
      $scope.availabilityGroups = $filter('groupBy')($scope.beers, 'availableId');
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
        // console.log('this is the response', response);
        // $location.path('ratings/' + response._id);
        $location.path('beer/' + response.beerId);

        // Clear form fields
        $scope.name = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.useAvailability = [];
    $scope.filterByAvailability = function() {
      return function(p) {
        for (var i in $scope.useAvailability) {
          if (p.availableId === $scope.availabilityGroups[i].availableId && $scope.useAvailability[i]) {
            return true;
          }
        }
      };
    };

    var abbrState = function(input, to) {
      var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
      ];
   
      input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      for (var i = 0; i < states.length; i++){
        if (states[i][0] === input){
          return (states[i][1]);
        }
      }    
    };

  }
]);

function findIndexByKeyValue(obj, key, value) {
  for (var i = 0; i < obj.length; i++) {
    if (obj[i][key] === value) {
      return i;
    }
  }
  return -1;
}

var uniqueItems = function (data, key) {
  var result = [];
  for (var i = 0; i < data.length; i++) {
    var idx = data[i][key];
    var aName = data[i]['available']['name'];
    if (findIndexByKeyValue(result, 'availableId', idx) === -1) {
        result.push({'availableId': idx, 'availableName': aName});
    }
  }
  return result;
};

angular.module('nearby').filter('groupBy', function () {
  return function (collection, key) {
    if (collection === null) return;
    return uniqueItems(collection, key);
  };
});