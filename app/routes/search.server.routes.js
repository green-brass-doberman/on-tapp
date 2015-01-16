'use strict';
var request = require('request');
var config = require('../../config/config');

module.exports = function(app) {
  // name contains the partial of what the user is searching for
  app.get('/api/search/:keyword/:page', function(req, res){
    request('https://api.brewerydb.com/v2/search?q=' + req.params.keyword + '&p=' + req.params.page + '&key=' + config.brewerydb.api, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
    });
  });
};
