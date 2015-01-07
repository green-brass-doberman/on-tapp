'use strict';
var secret = require('../../api-key');
var request = require('request');

module.exports = function(app) {
  // name contains the partial of what the user is searching for
  app.get('/search/:keyword/:page/:searchtype', function(req, res){
    if (req.params.searchtype !== 'all') {
      request('https://api.brewerydb.com/v2/search?q=' + req.params.keyword + '&p=' + req.params.page + '&type=' + req.params.searchtype + '&key=' + secret.keys.brewerydb, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          res.send(body);
        }
      });      
    } else {
      request('https://api.brewerydb.com/v2/search?q=' + req.params.keyword + '&p=' + req.params.page + '&key=' + secret.keys.brewerydb, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          res.send(body);
        }
      });      
    }
  });
};