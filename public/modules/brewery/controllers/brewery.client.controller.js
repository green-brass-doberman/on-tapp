'use strict';

angular.module('nearby').controller('BreweryController', ['$scope', 'Brewery', '$stateParams',
  function($scope, Brewery, $stateParams) {
    // Brewery controller logic
    $scope.breweryId = $stateParams.breweryId;
    var holdSocial = [];

    Brewery.getData($scope.breweryId).success(function(results, status) {
      $scope.brewery = results.data || 'Request failed';

      if ($scope.brewery.socialAccounts){
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
  }
]);
