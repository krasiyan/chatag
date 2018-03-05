'use strict';

var app = require('../../server/server');

module.exports = function(Tag) {
  if (app.get('exposeDestroyAllTagRemoteMethod')) {
    Tag.remoteMethod('destroyAll', {
      isStatic: true,
      description: 'Delete all matching records',
      accessType: 'WRITE',
      accepts: {
        arg: 'where',
        type: 'object',
        description: 'filter.where object',
      },
      http: {verb: 'del', path: '/'},
    });
  }
};
