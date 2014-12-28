var app = require('./server/server.js');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

// Start the app by listening on <port>
app.listen(port);

console.log('Server running on port %d', port);
