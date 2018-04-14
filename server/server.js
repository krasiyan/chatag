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

var socketIOAdapterConfig = app.get('redisSocketIOAdapterConfig') || {
  host: 'localhost',
  port: 6379,
};

// when the server is started by webpack or via `$ node server.js` (mostly when built)
// the boot instructions are provided by an explicit webpack resolve alias
//   - see backpack.config.js
//   - lifted from https://github.com/zamb3zi/loopback-webpack-example
if (require.main === module) {
  var bootInstructions = require('boot-instructions.json');
  var execute = require('loopback-boot/lib/executor');
  execute(app, bootInstructions, function(err) {
    if (err) {
      console.error(`Boot error: ${err}`);
      throw err;
    }

    app.io = io(app.start());
    app.io.adapter(redisAdapter(socketIOAdapterConfig));
  });
// when the server is being required (i.e. in the db seed script)
// the app is left to boot normally
} else {
  boot(app, __dirname, function(err) {
    if (err) throw err;

    // instantiate the standalone 'socket.io-emitter' even in no http server is started
    // so that WS events can still be emitted from the model hooks
    app.io = require('socket.io-emitter')(socketIOAdapterConfig);
  });
}
