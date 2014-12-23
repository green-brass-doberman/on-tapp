var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Serve static files
app.use('/', express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());

// export our app for testing and flexibility, required by index.js
module.exports = app;
