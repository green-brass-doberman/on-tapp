'use strict';

var request = require('request');

module.exports = function(app) {
	// Routing logic
	// ...
  app.get('/recommendation/:userId', function(req, res){

    request.post({
      headers: {'content-type' : 'application/json'},
      url: 'http://54.183.105.216:8000/queries.json',
      body: JSON.stringify({
        user: '54b47a41557aa852537fb0ef',
        num: 1
      })
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
    });
  });
};
