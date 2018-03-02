'use strict';

var path = require('path');

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/status', server.loopback.status());
  router.get('/', function(req, res) {
    var indexFile = path.resolve(__dirname, '../..', server.get('indexFile'));
    res.sendFile(indexFile);
  });

  server.use(router);
};
