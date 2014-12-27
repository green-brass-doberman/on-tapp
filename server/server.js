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

app.use('/api', function(){
  request('http://api.brewerydb.com/v2/?key='+secret.keys.brewerydb, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body); // Show the HTML for the Google homepage.
    }
  });
});

// export our app for testing and flexibility, required by index.js
module.exports = app;
