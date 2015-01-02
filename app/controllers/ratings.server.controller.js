'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Rating = mongoose.model('Rating'),
	_ = require('lodash');

/**
 * Create a Rating
 */
exports.create = function(req, res) {
	var rating = new Rating(req.body);
	rating.user = req.user;

	rating.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rating);
		}
	});
};

/**
 * Show the current Rating
 */
exports.read = function(req, res) {
	res.jsonp(req.rating);
};

/**
 * Update a Rating
 */
exports.update = function(req, res) {
	var rating = req.rating ;

	rating = _.extend(rating , req.body);

	rating.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rating);
		}
	});
};

/**
 * Delete an Rating
 */
exports.delete = function(req, res) {
	var rating = req.rating ;

	rating.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rating);
		}
	});
};

/**
 * List of Ratings
 */
exports.list = function(req, res) { 
	Rating.find().sort('-created').populate('user', 'displayName').exec(function(err, ratings) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ratings);
		}
	});
};

/**
 * Rating middleware
 */
exports.ratingByID = function(req, res, next, id) { 
	Rating.findById(id).populate('user', 'displayName').exec(function(err, rating) {
		if (err) return next(err);
		if (! rating) return next(new Error('Failed to load Rating ' + id));
		req.rating = rating ;
		next();
	});
};

/**
 * Rating authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.rating.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
