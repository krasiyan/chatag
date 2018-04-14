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

  Tag.getInRegion = function(swLat, swLng, neLat, neLng, next) {
    var query = {
      location: {
        geoWithin: {
          $box: [
            [swLat, swLng],
            [neLat, neLng],
          ],
        },
      },
    };

    Tag.find({where: query}, next);
  };

  Tag.remoteMethod(
    'getInRegion',
    {
      http: {path: '/in-region', verb: 'get'},
      accepts: [{
        arg: 'swLat', type: 'number', required: true,
      }, {
        arg: 'swLng', type: 'number', required: true,
      }, {
        arg: 'neLat', type: 'number', required: true,
      }, {
        arg: 'neLng', type: 'number', required: true,
      }],
      returns: {type: ['tag'], root: true},
      description: 'Get instances in the requested geographical region',
    }
  );

  Tag.observe('after save', function(ctx, next) {
    if (!ctx.instance) return next();

    var eventName = ctx.isNewInstance ? 'tagCreated' : 'tagUpdated';
    Tag.app.io.emit(eventName, ctx.instance);

    next();
  });

  Tag.observe('before delete', function(ctx, next) {
    if (!ctx.where || !ctx.where.id) return next();

    Tag.app.io.emit('tagDeleted', {id: ctx.where.id});

    next();
  });
  Tag.validatesLengthOf('message', { max: 140, message: { max: 'Message should be up to 140 characters' } });
};