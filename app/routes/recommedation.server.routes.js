'use strict';

var predictionio = require('predictionio-driver');
var engine = new predictionio.Engine({url: 'http://54.183.105.216:8000'});

module.exports = function(app) {
	// Routing logic
	// ...
  app.get('/recommendation/:userId', function(req, res){
    engine.sendQuery({
      user: req.params.userId,
      num: 2
    }).
    then(function (result) {
      console.log('here we go!', result);
    });
  });
};
