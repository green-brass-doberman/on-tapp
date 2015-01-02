'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Rating = mongoose.model('Rating'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, rating;

/**
 * Rating routes tests
 */
describe('Rating CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Rating
		user.save(function() {
			rating = {
				name: 'Rating Name'
			};

			done();
		});
	});

	it('should be able to save Rating instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rating
				agent.post('/ratings')
					.send(rating)
					.expect(200)
					.end(function(ratingSaveErr, ratingSaveRes) {
						// Handle Rating save error
						if (ratingSaveErr) done(ratingSaveErr);

						// Get a list of Ratings
						agent.get('/ratings')
							.end(function(ratingsGetErr, ratingsGetRes) {
								// Handle Rating save error
								if (ratingsGetErr) done(ratingsGetErr);

								// Get Ratings list
								var ratings = ratingsGetRes.body;

								// Set assertions
								(ratings[0].user._id).should.equal(userId);
								(ratings[0].name).should.match('Rating Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Rating instance if not logged in', function(done) {
		agent.post('/ratings')
			.send(rating)
			.expect(401)
			.end(function(ratingSaveErr, ratingSaveRes) {
				// Call the assertion callback
				done(ratingSaveErr);
			});
	});

	it('should not be able to save Rating instance if no name is provided', function(done) {
		// Invalidate name field
		rating.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rating
				agent.post('/ratings')
					.send(rating)
					.expect(400)
					.end(function(ratingSaveErr, ratingSaveRes) {
						// Set message assertion
						(ratingSaveRes.body.message).should.match('Please fill Rating name');
						
						// Handle Rating save error
						done(ratingSaveErr);
					});
			});
	});

	it('should be able to update Rating instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rating
				agent.post('/ratings')
					.send(rating)
					.expect(200)
					.end(function(ratingSaveErr, ratingSaveRes) {
						// Handle Rating save error
						if (ratingSaveErr) done(ratingSaveErr);

						// Update Rating name
						rating.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Rating
						agent.put('/ratings/' + ratingSaveRes.body._id)
							.send(rating)
							.expect(200)
							.end(function(ratingUpdateErr, ratingUpdateRes) {
								// Handle Rating update error
								if (ratingUpdateErr) done(ratingUpdateErr);

								// Set assertions
								(ratingUpdateRes.body._id).should.equal(ratingSaveRes.body._id);
								(ratingUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Ratings if not signed in', function(done) {
		// Create new Rating model instance
		var ratingObj = new Rating(rating);

		// Save the Rating
		ratingObj.save(function() {
			// Request Ratings
			request(app).get('/ratings')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Rating if not signed in', function(done) {
		// Create new Rating model instance
		var ratingObj = new Rating(rating);

		// Save the Rating
		ratingObj.save(function() {
			request(app).get('/ratings/' + ratingObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', rating.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Rating instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rating
				agent.post('/ratings')
					.send(rating)
					.expect(200)
					.end(function(ratingSaveErr, ratingSaveRes) {
						// Handle Rating save error
						if (ratingSaveErr) done(ratingSaveErr);

						// Delete existing Rating
						agent.delete('/ratings/' + ratingSaveRes.body._id)
							.send(rating)
							.expect(200)
							.end(function(ratingDeleteErr, ratingDeleteRes) {
								// Handle Rating error error
								if (ratingDeleteErr) done(ratingDeleteErr);

								// Set assertions
								(ratingDeleteRes.body._id).should.equal(ratingSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Rating instance if not signed in', function(done) {
		// Set Rating user 
		rating.user = user;

		// Create new Rating model instance
		var ratingObj = new Rating(rating);

		// Save the Rating
		ratingObj.save(function() {
			// Try deleting Rating
			request(app).delete('/ratings/' + ratingObj._id)
			.expect(401)
			.end(function(ratingDeleteErr, ratingDeleteRes) {
				// Set message assertion
				(ratingDeleteRes.body.message).should.match('User is not logged in');

				// Handle Rating error error
				done(ratingDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Rating.remove().exec();
		done();
	});
});