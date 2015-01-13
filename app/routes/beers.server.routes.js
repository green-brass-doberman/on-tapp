'use strict';
var request = require('request');
var config = require('../../config/config');

module.exports = function(app) {
  // breweryId contains the id of the brewery to allow listing of beers
  app.get('/beers/:breweryId', function(req, res){
    request('https://api.brewerydb.com/v2/brewery/' + req.params.breweryId + '/beers?key=' + config.brewerydb.api, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
    });
  });
};
