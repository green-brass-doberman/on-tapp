'use strict';

var request = require('request');
var config = require('../../config/config');

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var ratings = require('../../app/controllers/ratings.server.controller');

	// Ratings Routes
	app.route('/ratings')
		.get(ratings.list)
		.post(users.requiresLogin, ratings.create);

	app.route('/ratings/:ratingId')
		.get(ratings.read)
		.put(users.requiresLogin, ratings.hasAuthorization, ratings.update)
		.delete(users.requiresLogin, ratings.hasAuthorization, ratings.delete);

	// Finish by binding the Rating middleware
	app.param('ratingId', ratings.ratingByID);

  // search by style
  app.get('/style/:styleName', function(req, res){
    request('https://api.brewerydb.com/v2/search/style?q=' + req.params.styleName + '&key=' + config.brewerydb.api, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
    });
  });
};
