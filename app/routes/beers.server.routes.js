'use strict';
var secret = require('../../api-key');
var request = require('request');

module.exports = function(app) {
  // breweryId contains the id of the brewery to allow listing of beers
  app.get('/beers/:breweryId', function(req, res){
    console.log('req.params.breweryId: ', req.params.breweryId);
    if (req.params.breweryId === 'all') {
      request('https://api.brewerydb.com/v2/beers?key=' + secret.keys.brewerydb, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          res.send(body);
        }
      });
    } else {
      request('https://api.brewerydb.com/v2/brewery/' + req.params.breweryId + '/beers?key=' + secret.keys.brewerydb, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          res.send(body);
        }
      });
    }
  });
};
