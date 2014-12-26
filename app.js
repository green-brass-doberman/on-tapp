var app = require('./server/server.js');

// Get the port from environment variables
var port = process.env.PORT || 3000;
// Start the app by listening on <port>
app.listen(port);

console.log('Server running on port %d', port);
