'use strict';
var request = require('request');
var config = require('../../config/config');
var api_key = config.brewerydb.api;

module.exports = function(app) {
  // beerId contains the id of the beer
  app.get('/beer/:beerId', function(req, res){
    request('https://api.brewerydb.com/v2/beer/' + req.params.beerId + '?withBreweries=Y&withSocialAccounts=Y&withIngredients=Y&key=' + api_key, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
    });
  });
};
