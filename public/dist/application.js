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
ApplicationConfiguration.registerModule('beers');

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

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

//Setting up route
angular.module('beers').config(['$stateProvider',
	function($stateProvider) {
		// Beers state routing
		$stateProvider.
		state('beer', {
			url: '/beer/:beerId',
			templateUrl: 'modules/beers/views/beer.client.view.html'
		}).
		state('beers', {
			url: '/beers/:breweryId',
			templateUrl: 'modules/beers/views/beers.client.view.html'
		});
	}
]);

'use strict';

angular.module('beers').controller('BeerController', ['$scope', 'Beer', '$stateParams', 
	function($scope, Beer, $stateParams) {
		// Beer controller logic
    $scope.beerId = $stateParams.beerId;
    
    Beer.getData($scope.beerId).success(function(results, status) {
      $scope.beer = results.data || 'Request failed';
    });
	}
]);
'use strict';

angular.module('beers').controller('BeersController', ['$scope', 'Beers', '$stateParams', 'Ratings', '$location',
	function($scope, Beers, $stateParams, Ratings, $location) {

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
    Beers.getData($scope.breweryId).success(handleSuccess);

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
        $location.path('ratings/' + response._id);

        // Clear form fields
        $scope.name = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
	}
]);

'use strict';

angular.module('beers').factory('Beer', ['$http',
	function($http) {
		// Public API
		return {
      getData: function(beerId){
        return $http.get('/beer/' + beerId);
      }
    };
	}
]);
'use strict';

angular.module('beers').factory('Beers', ['$http', '$resource',
	function($http, $resource) {
		// Public API
		return {
      getData: function(breweryId){
        return $http.get('/beers/' + breweryId);
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
		state('search', {
			url: '/search/:page/:keyword/:searchtype',
			templateUrl: 'modules/core/views/search.client.view.html'
		}).
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
      $state.go('search', {'page': currentPage, 'keyword': $scope.keyword, 'searchtype': $scope.searchType});
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

angular.module('core').controller('SearchController', ['$scope', 'Search', '$stateParams', '$state',
	function($scope, Search, $stateParams, $state) {
		// Search controller logic
    $scope.results = [];
        
    Search.getData($stateParams.keyword, $stateParams.page, $stateParams.searchtype).success(function(response, status) {
      $scope.status = status;
      if ($scope.status === 200) {
        if (response.totalResults !== undefined) {
          $scope.numberOfPages = response.numberOfPages;
          $scope.totalResults = response.totalResults;
          $scope.keyword = $stateParams.keyword;
          $scope.currentPage = $stateParams.page;
          $scope.searchType = $stateParams.searchtype;
          $scope.results = response.data;
        } else {
          $scope.totalResults = 0;
          $scope.numberOfPages = 0;
        }
      } else {
        $scope.results = response || 'Request failed';
      }
    });

    $scope.search = function(currentPage) {
      currentPage = currentPage || 1;
      $state.go('search', {'page': currentPage, 'keyword': $scope.keyword, 'searchtype': $scope.searchType});
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
      getData: function(keyword, page, searchtype){
        return $http.get('/search/' + keyword + '/' + page + '/' + searchtype);
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
		state('brewery', {
			url: '/brewery/:breweryId',
			templateUrl: 'modules/nearby/views/brewery.client.view.html'
		}).
		state('nearby', {
			url: '/nearby',
			templateUrl: 'modules/nearby/views/nearby.client.view.html'
		});

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAQHm36O2gZr34HkBjElKYHox3LVWR8UWY',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });
	}
]);

'use strict';

angular.module('nearby').controller('BreweryController', ['$scope', 'Brewery', '$stateParams', 
  function($scope, Brewery, $stateParams) {
    // Brewery controller logic
    $scope.breweryId = $stateParams.breweryId;
    var holdSocial = [];
    
    Brewery.getData($scope.breweryId).success(function(results, status) {
      $scope.brewery = results.data || 'Request failed';
      for (var i = 0; i < $scope.brewery.socialAccounts.length; i++) {
        // only save the social media sites that are FB, Twitter, 4Square, 
        // Google+, YouTube, Instagram, Yelp or Pinterest
        var tempSocial = $scope.brewery.socialAccounts[i];
        if ([1,2,3,8,10,14,15,16].indexOf(tempSocial.socialMediaId) > -1) {
          holdSocial.push(tempSocial);
        }
      }
      $scope.socialMedia = holdSocial;
    });
  }
]);
'use strict';

angular.module('nearby').controller('NearbyController', ['$scope', 'Breweries', 'geolocation', '$stateParams', 'uiGmapLogger', '$anchorScroll', '$location', 'usSpinnerService',
	function($scope, Breweries, geolocation, $stateParams, uiGmapLogger, $anchorScroll, $location, usSpinnerService) {

    // enable logging of google map info and error
    uiGmapLogger.doLog = true;

    // this array would be used to fetch data from brewerydb factory
    $scope.breweries = [];

    // an object to story user's current coordinate,
    $scope.coords = {};

    // pushing breweries data from $http request and place markers
    var handleSuccess = function(data, status){

      if (data.data){

        $scope.breweries = data.data;

        placeMarker();

      } else {

        $scope.breweries = [{
          brewery: {
            name: 'Sorry',
            description: 'No breweries nearby'
          }
        }];

      }

      // stop the spinner
      usSpinnerService.stop('spinner-1');
    };

    // function to access users geolocation coordinates
    geolocation.getLocation().then(function(data){
      // get user coordinates
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};

      // set to san francisco by Default for Victor
      // $scope.coords = {lat:37.7833, long:-122.4167};

      // initialise the Google map
      $scope.map = { center: { latitude: $scope.coords.lat, longitude: $scope.coords.long }, zoom: 12};

      // allow scroll to zoom
      $scope.windowOptions = {
         visible: true
      };

      // add maker for current location
      curLocationMarker();

      // get Breweries data from factory
      Breweries.getData($scope.coords).success(handleSuccess);

    });

    // marker for current coordinate
    var curLocationMarker = function(){
      $scope.marker = {
        id: 'curLoc',
        coords: {
          latitude: $scope.coords.lat,
          longitude: $scope.coords.long,
        },
        options: {
          animation: 'DROP'
        }
      };
    };

    $scope.windowOptions = {
      visible: true
    };

    $scope.onClick = function() {
      $scope.windowOptions.visible = !$scope.windowOptions.visible;
    };

    $scope.closeClick = function() {
      $scope.windowOptions.visible = false;
    };

    $scope.title = 'You are here!';

    $scope.clickEventsObject = {
      mouseover: function(marker, e, model)  {
        model.mouseOver();
      },
      mouseout: function(marker, e, model)  {
        model.mouseOut();
      }
    };

    // an array to store all breweries marker
    $scope.allMarkers = [];

    // create markers for all breweries
    var createMarker = function (i, lat, lng, name, breweryId) {
      var ret = {
        id: i,
        breweryId: breweryId,
        latitude: lat,
        longitude: lng,
        title: name,
        icon: '/modules/nearby/images/beer-icon.png',
        show: false
      };
      ret.onClick = function() {
        ret.show = !ret.show;
      };
      ret.mouseOver = function(){
        ret.show = !ret.show;
        $scope.gotoAnchor(breweryId);
      };
      ret.mouseOut = function(){
        ret.show = !ret.show;
      };

      return ret;
    };

    // a function to place all breweries markers
    var placeMarker = function(){

      var markers = [];
      for (var i = 0; i < $scope.breweries.length; i++) {
        var lat = $scope.breweries[i].latitude;
        var lng = $scope.breweries[i].longitude;
        var name = $scope.breweries[i].brewery.name;
        var breweryId = $scope.breweries[i].brewery.id;

        markers.push(createMarker(i, lat, lng, name, breweryId));
      }

      $scope.allMarkers = markers;
    };

    $scope.gotoAnchor = function(x) {
      var newHash = 'anchor' + x;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash('anchor' + x);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    };
  }
]);

angular.module('nearby').run(['$anchorScroll', function($anchorScroll) {
  $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}]);

'use strict';

angular.module('nearby').factory('Breweries', ['$http',
	function($http) {
		// Breweries service logic
		// ...

		// Public API
		return {
      getData: function(coords){
        return $http.get('/breweries/' + coords.lat + '/' + coords.long);
      }
    };
	}
]);

'use strict';

angular.module('nearby').factory('Brewery', ['$http',
	function($http) {
		// Public API
		return {
      getData: function(breweryId){
        return $http.get('/brewery/' + breweryId);
      }
    };
	}
]);
'use strict';

// Configuring the Articles module
angular.module('ratings').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Ratings', 'ratings', '/ratings(/create)?');
	}
]);

'use strict';

//Setting up route
angular.module('ratings').config(['$stateProvider',
	function($stateProvider) {
		// Ratings state routing
		$stateProvider.
		state('listRatings', {
			url: '/ratings',
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

'use strict';

//Ratings service used to communicate Ratings REST endpoints
angular.module('ratings').factory('Ratings', ['$resource',
	function($resource) {
		return $resource('ratings/:ratingId', {
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
				return $http.get('/style/' + styleName);
			}
		};
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