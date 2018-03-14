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

  Tag.observe('after save', function (ctx, next) {
    var eventName = ctx.isNewInstance ? 'tagCreated' : 'tagUpdated'
    Order.app.io.emit(eventName, ctx.instance);

    next();
  });

  Tag.observe('before delete', function (ctx, next) {
    Order.app.io.emit('tagDeleted', { id: ctx.instance.id });

    next();
  })
};
