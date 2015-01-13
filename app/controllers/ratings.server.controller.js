'use strict';

// accessKey is required for PredictionIO 0.8.2+
var secret = require('../../api-key');

var request = require('request');

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

  Rating.findByBeerId(rating.beerId, function (err, beer) {

    var result;
    // Register a new user-to-item action
    request.post({
      headers: {'content-type' : 'application/json'},
      url: 'http://54.183.105.216:7070/events.json?accessKey=' + secret.keys.predictionio,
      body: JSON.stringify({
        event: 'rate',
        entityType : 'user',
        entityId: rating.user,
        targetEntityType: 'item',
        targetEntityId: rating.beerId,
        properties : {
          rating : rating.stars
        },
        eventTime: new Date().toISOString()
      })
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body);
      }
    });

    if (beer.length){
      rating = beer[0];
      rating.stars += beer[0].stars;
    }

    rating.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(rating);
      }
    });

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
