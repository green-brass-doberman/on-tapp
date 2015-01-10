'use strict';

var predictionio = require('predictionio-driver');
var engine = new predictionio.Engine({url: 'http://localhost:8000'});

module.exports = function(app) {
	// Routing logic
	// ...
  app.get('/recommendation/:userId', function(req, res){
    console.log('coming to this route', req.params.beerId, req.params.userId);
    engine.sendQuery({
      uid: req.params.userId,
      num: 2
    }).
    then(function (result) {
      console.log('here we go!', result);
    });
  });
};
