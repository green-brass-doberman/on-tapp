'use strict';

var request = require('request');
var config = require('../../config/config');

module.exports = function(app) {
  // Routing logic
  // ...
  app.get('/api/recommendation/:userId', function(req, res){

    request.post({
      headers: {'content-type' : 'application/json'},
      url: config.predictionio.resultsServerIP + '/queries.json',
      body: JSON.stringify({
        user: '54b47a41557aa852537fb0ef',
        num: 1
      })
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send(body);
      } else {
        res.send(error);
      }
    });
  });
};
