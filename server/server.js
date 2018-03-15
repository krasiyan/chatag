'use strict';

require('dotenv').config();
// fallback to development if not defined otherwise
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var io = require('socket.io');
var redisAdapter = require('socket.io-redis');

var app = module.exports = loopback();

app.start = function() {
  var staticFolder = path.dirname(
    path.resolve(__dirname, '..', app.get('indexFile'))
  );
  app.use(loopback.static(staticFolder));

  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  var socketIOAdapterConfig = app.get('redisSocketIOAdapterConfig') || {
    host: 'localhost',
    port: 6379
  };

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.io = io(app.start());
    app.io.adapter(redisAdapter(socketIOAdapterConfig));
  } else {
    // instantiate the standalone 'socket.io-emitter' even in no http server is started
    // so that WS events can still be emitted from the model hooks
    app.io = require('socket.io-emitter')(socketIOAdapterConfig);
  }
});
