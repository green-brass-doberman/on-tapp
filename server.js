var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Serve static files
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Get the port from environment variables
var port = process.env.PORT || 3000;

// Start the app by listening on <port>
app.listen(port);

console.log('Server running on port %d', port);
