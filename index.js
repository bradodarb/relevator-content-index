var Hapi = require('hapi');
//var models = require('./models');
var port = process.env.PORT || 3000;
// create the server
var server = new Hapi.Server();
server.connection({ port : port })

// routes
server.route(require('./lib/routes'));
 
server.start(function() {
    console.log('Running on ' + port);
  });
