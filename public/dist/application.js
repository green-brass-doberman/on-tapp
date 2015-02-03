'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
  // Init module configuration options
  var applicationModuleName = 'onTappApp';
  var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'uiGmapgoogle-maps', 'geolocation', 'angularSpinner'];

  // Add a new vertical module
  var registerModule = function(moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  }
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_') window.location.hash = '#!';

  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('beer');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('brewery');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('nearby');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('ratings');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('search');

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

//Setting up route
angular.module('beer').config(['$stateProvider',
  function($stateProvider) {
    // Beers state routing
    $stateProvider.
    state('beer', {
      url: '/beer/:beerId',
      templateUrl: 'modules/beer/views/beer.client.view.html'
    });
  }
]);

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

'use strict';

angular.module('beer').factory('Beer', ['$http',
  function($http) {
    // Public API
    return {
      getData: function(beerId){
        return $http.get('/api/beer/' + beerId);
      }
    };
  }
]);

'use strict';

angular.module('beer').factory('StyleQuery', ['$http',
  function($http) {
    // Stylequery service logic
    // ...

    // Public API
    return {
      getStyle: function(styleName) {
        return $http.get('/api/style/' + styleName);
      }
    };
  }
]);

'use strict';

//Setting up route
angular.module('brewery').config(['$stateProvider',
  function($stateProvider) {
    // Beers state routing
    $stateProvider.
    state('brewery', {
      url: '/brewery/:breweryId',
      templateUrl: 'modules/brewery/views/brewery.client.view.html'
    });
  }
]);

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
    $scope.beerId = '';
    var index;
    var styleName = '';

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
    $scope.create = function() {
      index = Core.findIndexByKeyValue($scope.beers, 'id', this.beer.id);
      if ($scope.beers[index].style === undefined) {
        styleName = 'onTapp';
      } else {
        styleName = $scope.beers[index].style.name;
      }
      // Create new Rating object
      var rating = new Ratings ({
        beerId: this.beer.id,
        name: $scope.beers[index].name,
        stars: this.rate,
        styleName: styleName
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

'use strict';

angular.module('nearby').factory('Brewery', ['$http',
  function($http) {
    // Public API
    return {
      getData: function(breweryId){
        return $http.get('/api/brewery/' + breweryId);
      },
      getBeersData: function(breweryId){
        return $http.get('/api/beers/' + breweryId);
      }
    };
  }
]);

'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');

    // Home state routing
    $stateProvider.
    state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    });
  }
]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$state',
  function($scope, Authentication, Menus, $state) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');

    $scope.toggleCollapsibleMenu = function() {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function() {
      $scope.isCollapsed = false;
    });

    // Search logic
    $scope.results = [];
    $scope.totalResults = undefined;

    $scope.search = function(currentPage) {
      currentPage = currentPage || 1;
      $state.go('search', {'page': currentPage, 'keyword': $scope.keyword});
      $scope.keyword = '';
    };
  }
]);

'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);

'use strict';

angular.module('core').factory('Core', [ 
  function() {
    return {
      fixPhone: function(phone) {
        var s = phone.toString();
        return s.substring(0,3) + '-' + s.substring(3,6) + '-' + s.substring(6);
      },
      findIndexByKeyValue: function(obj, key, value) {
        for (var i = 0; i < obj.length; i++) {
          if (obj[i][key] === value) {
            return i;
          }
        }
        return -1;
      },
      calculateRadius: function(bounds) {
        var ne = new google.maps.LatLng(bounds.northeast.latitude, bounds.northeast.longitude);
        var sw = new google.maps.LatLng(bounds.southwest.latitude, bounds.southwest.longitude);
        var nw = new google.maps.LatLng(bounds.northeast.latitude, bounds.southwest.longitude);
        var width = google.maps.geometry.spherical.computeDistanceBetween(ne, nw);
        var height = google.maps.geometry.spherical.computeDistanceBetween(sw, nw);
        return Math.min(width, height) / 2; 
      },
      abbrState: function(input) {
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
      }
    };
  }
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

  function() {
    // Define a set of default roles
    this.defaultRoles = ['*'];

    // Define the menus object
    this.menus = {};

    // A private function for rendering decision
    var shouldRender = function(user) {
      if (user) {
        if (!!~this.roles.indexOf('*')) {
          return true;
        } else {
          for (var userRoleIndex in user.roles) {
            for (var roleIndex in this.roles) {
              if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
                return true;
              }
            }
          }
        }
      } else {
        return this.isPublic;
      }

      return false;
    };

    // Validate menu existance
    this.validateMenuExistance = function(menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exists');
        }
      } else {
        throw new Error('MenuId was not provided');
      }

      return false;
    };

    // Get the menu object by menu id
    this.getMenu = function(menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Return the menu object
      return this.menus[menuId];
    };

    // Add new menu object by menu id
    this.addMenu = function(menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeMenu = function(menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Return the menu object
      delete this.menus[menuId];
    };

    // Add menu item object
    this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || ('/' + menuItemURL),
        isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
        roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
        position: position || 0,
        items: [],
        shouldRender: shouldRender
      });

      // Return the menu object
      return this.menus[menuId];
    };

    // Add submenu item object
    this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || ('/' + menuItemURL),
            isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
            roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
            position: position || 0,
            shouldRender: shouldRender
          });
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeMenuItem = function(menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeSubMenuItem = function(menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    //Adding the topbar menu
    this.addMenu('topbar');
  }
]);

'use strict';

angular.module('core').factory('Search', ['$http',
  function($http) {
    // Public API
    return {
      getData: function(keyword, page){
        return $http.get('/api/search/' + keyword + '/' + page);
      }
    };
  }
]);

'use strict';

// Configuring the Articles module
angular.module('nearby').run(['Menus',
  function(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Nearby', 'nearby', '/nearby');
  }
]);

'use strict';

//Setting up route
angular.module('nearby').config(['$stateProvider', 'uiGmapGoogleMapApiProvider',
  function($stateProvider, uiGmapGoogleMapApiProvider) {
    // Nearby state routing
    $stateProvider.
    state('nearby', {
      url: '/nearby',
      templateUrl: 'modules/nearby/views/nearby.client.view.html'
    });

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAQHm36O2gZr34HkBjElKYHox3LVWR8UWY',
      v: '3.17',
      libraries: 'geometry,visualization'
    });
  }
]);

'use strict';

angular.module('nearby').controller('infoWindowController', ['$scope', '$stateParams', 
  function($scope, $stateParams) {
    $scope.params = $stateParams;
  }
]);
'use strict';

angular.module('nearby').controller('NearbyController', ['$scope', 'uiGmapGoogleMapApi', 'uiGmapIsReady', 'Breweries', 'geolocation', 'uiGmapLogger', 'usSpinnerService', 'Core', 
  function($scope, uiGmapGoogleMapApi, uiGmapIsReady, Breweries, geolocation, uiGmapLogger, usSpinnerService, Core) {

    // enable logging of google map info and error
    uiGmapLogger.doLog = true;

    $scope.breweries = []; // used to fetch data from brewerydb factory
    $scope.coords = {}; // user's current coordinates
    $scope.allMarkers = []; // array to store the brewery markers
    $scope.oldWindow = -1; // var to hold id of old info window
    var bounds, radius;

    // pushing breweries data from $http request and place markers
    var handleSuccess = function(data, status){
      if (data.data){
        $scope.breweries = data.data;
        placeMarker();
      }
      updateRadius();
      usSpinnerService.stop('spinner-1'); //stop the spinner
    };

    // marker for current coordinate
    var curLocationMarker = function(){
      $scope.marker = {
        id: 'curLoc',
        coords: {
          latitude: $scope.coords.latitude,
          longitude: $scope.coords.longitude,
        },
        options: {
          title: 'You are here!'
        }
      };
    };

    var createMarker = function (i) {
      var name = $scope.breweries[i].brewery.name;
      var addr = ($scope.breweries[i].streetAddress !== undefined) ? $scope.breweries[i].streetAddress + '<br>' : '';
      var phone = ($scope.breweries[i].phone !== undefined) ? $scope.breweries[i].phone + '<br>' : '';
      var id = $scope.breweries[i].brewery.id;
      var dist = $scope.breweries[i].distance + ' miles away<br>';
      var desc = '<div class="info-window"><a href="#!/brewery/' + id + '"><strong>' +
                 name + '</strong></a><br>' + dist + addr + phone + '</div>';
      var ret = {
        id: i,
        coords : {
          latitude: $scope.breweries[i].latitude,
          longitude: $scope.breweries[i].longitude,
        },
        options: {
          title: name,
        },
        infoWindow: {
          content: desc,
          maxWidth: 500
        },
        icon: '/modules/nearby/images/beer-icon.png',
        showWindow: false
      };
      ret.onClick = function() {
        if ($scope.oldWindow > -1) {
          $scope.allMarkers[$scope.oldWindow].showWindow = false;
        }
        $scope.oldWindow = ret.id;
        ret.showWindow = !ret.showWindow;
      };

      return ret;
    };

    // create markers for all breweries
    var placeMarker = function() { // places all the brewery markers
      var markers = [];
      for (var i = 0; i < $scope.breweries.length; i++) {
        markers.push(createMarker(i));
      }
      $scope.allMarkers = markers;
    };

    // update radius and circle
    var updateRadius = function() {
      bounds = $scope.map.bounds;
      radius = Core.calculateRadius(bounds);
      // $scope.circle = {
      //   id: 1,
      //   center: $scope.map.center, 
      //   radius: radius,
      //   stroke: {
      //       color: '#1ABC9C',
      //       weight: 2,
      //       opacity: 1
      //   },
      //   fill: {
      //       color: '#1ABC9C',
      //       opacity: 0.5
      //   }
      // };
    };

    $scope.getUserLocation = function(){
        // function to access users geolocation coordinates, draw map and place markers
      geolocation.getLocation().then(function(data){
        $scope.coords = {
          latitude: data.coords.latitude, 
          longitude: data.coords.longitude
        };

        uiGmapGoogleMapApi.then(function(maps) {
          $scope.map = { 
            center: { 
              latitude: $scope.coords.latitude, 
              longitude: $scope.coords.longitude 
            }, 
            zoom: 14,
            bounds: {},
            events: {
              idle: function() {
                uiGmapIsReady.promise().then(function() {
                  updateRadius();
                  var dbRadius = radius / 1000;
                  Breweries.getData($scope.map.center, dbRadius).success(handleSuccess); // get brewery data from factory
                });
              }
            }
          };

          curLocationMarker(); // add marker for current location
        });

        uiGmapIsReady.promise().then(function() {
          updateRadius();
          var dbRadius = radius / 1000;
          Breweries.getData($scope.map.center, dbRadius).success(handleSuccess); // get brewery data from factory
        });
      });
    };

  }
]);

'use strict';

angular.module('nearby').factory('Breweries', ['$http',
  function($http) {
    // Public API
    return {
      getData: function(coords, radius){
        return $http.get('/api/breweries/' + coords.latitude + '/' + coords.longitude + '/' + radius);
      }
    };
  }
]);

'use strict';

// Configuring the Articles module
angular.module('ratings').run(['Menus',
  function(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Recommendations', 'recommendations', '/ratings(/create)?');
  }
]);

'use strict';

//Setting up route
angular.module('ratings').config(['$stateProvider',
  function($stateProvider) {
    // Ratings state routing
    $stateProvider.
    state('listRatings', {
      url: '/recommendations',
      templateUrl: 'modules/ratings/views/list-ratings.client.view.html'
    }).
    state('viewRating', {
      url: '/ratings/:ratingId',
      templateUrl: 'modules/ratings/views/view-rating.client.view.html'
    }).
    state('editRating', {
      url: '/ratings/:ratingId/edit',
      templateUrl: 'modules/ratings/views/edit-rating.client.view.html'
    });
  }
]);

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
        console.log('this is the prediction data', data);
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

'use strict';

angular.module('beer').factory('Beer', ['$http',
  function($http) {
    // Public API
    return {
      getData: function(beerId){
        return $http.get('/api/beer/' + beerId);
      }
    };
  }
]);

'use strict';

angular.module('ratings').factory('PredictionIO', ['$http',
  function($http) {
    // Predictionio service logic
    // ...

    // Public API
    return {
      getRecommendaton: function(userId) {
        return $http.get('/api/recommendation/' + userId);
      }
    };
  }
]);

'use strict';

//Ratings service used to communicate Ratings REST endpoints
angular.module('ratings').factory('Ratings', ['$resource',
  function($resource) {
    return $resource('/api/ratings/:ratingId', {
      ratingId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

'use strict';

angular.module('ratings').factory('StyleQuery', ['$http',
  function($http) {
    // Stylequery service logic
    // ...

    // Public API
    return {
      getStyle: function(styleName) {
        return $http.get('/api/style/' + styleName);
      }
    };
  }
]);

'use strict';

//Setting up route
angular.module('search').config(['$stateProvider',
  function($stateProvider) {
    // Ratings state routing
    $stateProvider.
    state('search', {
      url: '/search/:page/:keyword',
      templateUrl: 'modules/search/views/search.client.view.html'
    });
  }
]);

'use strict';

angular.module('search').controller('SearchController', ['$scope', 'Search', '$stateParams', '$state', 'usSpinnerService',
  function($scope, Search, $stateParams, $state, usSpinnerService) {
    // Search controller logic
    $scope.results = [];
    $scope.totalResults = undefined;

    $scope.search = function(currentPage) {
      currentPage = currentPage || 1;
      $state.go('search', {'page': currentPage, 'keyword': $scope.keyword});
      $scope.keyword = '';
    };

    Search.getData($stateParams.keyword, $stateParams.page).success(function(response, status) {
      $scope.status = status;
      if ($scope.status === 200) {
        if (response.totalResults !== undefined) {
          $scope.numberOfPages = response.numberOfPages;
          $scope.totalResults = response.totalResults;
          $scope.keyword = $stateParams.keyword;
          $scope.currentPage = $stateParams.page;
          $scope.results = response.data;
        } else {
          $scope.totalResults = 0;
          $scope.numberOfPages = 0;
        }
      } else {
        $scope.results = response || 'Request failed';
      }
      usSpinnerService.stop('spinner-2'); //stop the spinner
    });
  }


]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
  function($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
      function($q, $location, Authentication) {
        return {
          responseError: function(rejection) {
            switch (rejection.status) {
              case 401:
                // Deauthenticate the global user
                Authentication.user = null;

                // Redirect to signin page
                $location.path('signin');
                break;
              case 403:
                // Add unauthorized behaviour
                break;
            }

            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);

'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function($stateProvider) {
    // Users state routing
    $stateProvider.
    state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).
    state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).
    state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).
    state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/authentication/signup.client.view.html'
    }).
    state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/authentication/signin.client.view.html'
    }).
    state('forgot', {
      url: '/password/forgot',
      templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
    }).
    state('reset-invalid', {
      url: '/password/reset/invalid',
      templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
    }).
    state('reset-success', {
      url: '/password/reset/success',
      templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
    }).
    state('reset', {
      url: '/password/reset/:token',
      templateUrl: 'modules/users/views/password/reset-password.client.view.html'
    });
  }
]);

'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
  function($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) $location.path('/');

    $scope.signup = function() {
      $http.post('/auth/signup', $scope.credentials).success(function(response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the index page
        $location.path('/');
      }).error(function(response) {
        $scope.error = response.message;
      });
    };

    $scope.signin = function() {
      $http.post('/auth/signin', $scope.credentials).success(function(response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the index page
        $location.path('/');
      }).error(function(response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
  function($scope, $stateParams, $http, $location, Authentication) {
    $scope.authentication = Authentication;

    //If user is signed in then redirect back home
    if ($scope.authentication.user) $location.path('/');

    // Submit forgotten password account id
    $scope.askForPasswordReset = function() {
      $scope.success = $scope.error = null;

      $http.post('/auth/forgot', $scope.credentials).success(function(response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;

      }).error(function(response) {
        // Show user error message and clear form
        $scope.credentials = null;
        $scope.error = response.message;
      });
    };

    // Change user password
    $scope.resetUserPassword = function() {
      $scope.success = $scope.error = null;

      $http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;

        // Attach user profile
        Authentication.user = response;

        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function(response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;

    // If user is not signed in then redirect back home
    if (!$scope.user) $location.path('/');

    // Check if there are additional accounts
    $scope.hasConnectedAdditionalSocialAccounts = function(provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }

      return false;
    };

    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function(provider) {
      return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
    };

    // Remove a user social account
    $scope.removeUserSocialAccount = function(provider) {
      $scope.success = $scope.error = null;

      $http.delete('/users/accounts', {
        params: {
          provider: provider
        }
      }).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function(response) {
        $scope.error = response.message;
      });
    };

    // Update a user profile
    $scope.updateUserProfile = function(isValid) {
      if (isValid) {
        $scope.success = $scope.error = null;
        var user = new Users($scope.user);

        user.$update(function(response) {
          $scope.success = true;
          Authentication.user = response;
        }, function(response) {
          $scope.error = response.data.message;
        });
      } else {
        $scope.submitted = true;
      }
    };

    // Change user password
    $scope.changeUserPassword = function() {
      $scope.success = $scope.error = null;

      $http.post('/users/password', $scope.passwordDetails).success(function(response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function(response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
  function() {
    var _this = this;

    _this._data = {
      user: window.user
    };

    return _this._data;
  }
]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
  function($resource) {
    return $resource('users', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
