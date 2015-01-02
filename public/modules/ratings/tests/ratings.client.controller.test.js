'use strict';

(function() {
	// Ratings Controller Spec
	describe('Ratings Controller Tests', function() {
		// Initialize global variables
		var RatingsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Ratings controller.
			RatingsController = $controller('RatingsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Rating object fetched from XHR', inject(function(Ratings) {
			// Create sample Rating using the Ratings service
			var sampleRating = new Ratings({
				name: 'New Rating'
			});

			// Create a sample Ratings array that includes the new Rating
			var sampleRatings = [sampleRating];

			// Set GET response
			$httpBackend.expectGET('ratings').respond(sampleRatings);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ratings).toEqualData(sampleRatings);
		}));

		it('$scope.findOne() should create an array with one Rating object fetched from XHR using a ratingId URL parameter', inject(function(Ratings) {
			// Define a sample Rating object
			var sampleRating = new Ratings({
				name: 'New Rating'
			});

			// Set the URL parameter
			$stateParams.ratingId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/ratings\/([0-9a-fA-F]{24})$/).respond(sampleRating);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.rating).toEqualData(sampleRating);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Ratings) {
			// Create a sample Rating object
			var sampleRatingPostData = new Ratings({
				name: 'New Rating'
			});

			// Create a sample Rating response
			var sampleRatingResponse = new Ratings({
				_id: '525cf20451979dea2c000001',
				name: 'New Rating'
			});

			// Fixture mock form input values
			scope.name = 'New Rating';

			// Set POST response
			$httpBackend.expectPOST('ratings', sampleRatingPostData).respond(sampleRatingResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Rating was created
			expect($location.path()).toBe('/ratings/' + sampleRatingResponse._id);
		}));

		it('$scope.update() should update a valid Rating', inject(function(Ratings) {
			// Define a sample Rating put data
			var sampleRatingPutData = new Ratings({
				_id: '525cf20451979dea2c000001',
				name: 'New Rating'
			});

			// Mock Rating in scope
			scope.rating = sampleRatingPutData;

			// Set PUT response
			$httpBackend.expectPUT(/ratings\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/ratings/' + sampleRatingPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid ratingId and remove the Rating from the scope', inject(function(Ratings) {
			// Create new Rating object
			var sampleRating = new Ratings({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Ratings array and include the Rating
			scope.ratings = [sampleRating];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/ratings\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleRating);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.ratings.length).toBe(0);
		}));
	});
}());