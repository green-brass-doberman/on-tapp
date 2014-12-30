'use strict';
var secret = require('../../api-key');
var request = require('request');

module.exports = function(app) {
	// Routing logic
	// ...
    // lat and lng contain the current location latitude and longitude to allow listing
  // of nearby breweries
  app.get('/breweries/:lat/:lng', function(req, res){
    request('https://api.brewerydb.com/v2/search/geo/point?lat=' + req.params.lat + '&lng=' + req.params.lng + '&key=' + secret.keys.brewerydb, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
    });
  });
};
