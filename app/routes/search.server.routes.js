'use strict';
var secret = require('../../api-key');
var request = require('request');

module.exports = function(app) {
  // name contains the partial of what the user is searching for
  app.get('/search/:item', function(req, res){
    console.log('req.params.item: ', req.params.item);
    request('https://api.brewerydb.com/v2/search?q=' + req.params.item + '&key=' + secret.keys.brewerydb, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
    });
  });
};