'use strict';
var secret = require('../../api-key');
var request = require('request');

module.exports = function(app) {
  // breweryId contains the id of the beer
  app.get('/brewery/:breweryId', function(req, res){
    request('https://api.brewerydb.com/v2/brewery/' + req.params.breweryId + '?withGuilds=Y&withSocialAccounts=Y&withLocations=Y&key=' + secret.keys.brewerydb, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
    });
  });
};