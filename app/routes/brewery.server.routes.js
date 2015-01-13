'use strict';
var request = require('request');
var config = require('../../config/config');

module.exports = function(app) {
  // breweryId contains the id of the beer
  app.get('/brewery/:breweryId', function(req, res){
    request('https://api.brewerydb.com/v2/brewery/' + req.params.breweryId + '?withGuilds=Y&withSocialAccounts=Y&withLocations=Y&key=' + config.brewerydb.api, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
    });
  });
};