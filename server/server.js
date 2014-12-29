// set up
var path = require('path');
var express = require('express');
var secret = require('./../api-key');
var request = require('request');

// create our app w/ express
var app = express();

// create our app w/ express
var mongoose = require('mongoose');

// log requests to the console (express4)
var morgan = require('morgan');

// pull information from HTML POST (express4)
var bodyParser = require('body-parser');

// set the static files location /client for users
app.use('/', express.static(path.join(__dirname, '../client')));

// log every request to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));

// parse application/json
app.use(bodyParser.json());

// lat and lng contain the current location latitude and longitude to allow listing
// of nearby breweries
app.get('/breweries/:lat/:lng', function(req, res){
  request('https://api.brewerydb.com/v2/search/geo/point?lat=' + req.params.lat + '&lng=' + req.params.lng + '&key=' + secret.keys.brewerydb, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
});

// breweryId contains the id of the brewery to allow listing of beers
app.get('/beers/:breweryId', function(req, res){
  request('https://api.brewerydb.com/v2/brewery/' + req.params.breweryId + '/beers?key=' + secret.keys.brewerydb, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
});

// export our app for testing and flexibility, required by index.js
module.exports = app;
