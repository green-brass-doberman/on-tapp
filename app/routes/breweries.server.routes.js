'use strict';
var request = require('request');
var config = require('../../config/config');

module.exports = function(app) {
  // lat and lng contain the current location latitude and longitude to allow listing
  // of nearby breweries
  app.get('/breweries/:lat/:lng', function(req, res){
    request('https://api.brewerydb.com/v2/search/geo/point?lat=' + req.params.lat + '&lng=' + req.params.lng + '&radius=20&key=' + config.brewerydb.api, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
    });
  });
};
