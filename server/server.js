var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var proxy = require('simple-http-proxy');
var secret = require('./../api-key');
var app = express();

opts = {
  proto: 'x-orig-proto',
  host: 'x-orig-host',
  port: 'x-orig-port',
  path: 'x-orig-path'
};

// Serve static files
app.use('/', express.static(path.join(__dirname, '../client')));

app.use('/api', proxy('http://api.brewerydb.com/v2/?key=' + secret.keys.brewerydb, opts));

app.use(bodyParser.json());

// export our app for testing and flexibility, required by index.js
module.exports = app;
