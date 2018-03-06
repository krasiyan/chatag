'use strict';

var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.dataSources.mongodb;

ds.automigrate('tag', function(err) {
  if (err) throw err;

  var tags = [
    {
      message: 'san francisco',
      location: {
        lat: 37.7749,
        lng: 122.4194,
      },
    },
    {
      message: 'sofia',
      location: {
        lat: 42.6977,
        lng: 23.3219,
      },
    },
    {
      message: 'pisa',
      location: {
        lat: 43.7228,
        lng: 10.4017,
      },
    },
    {
      message: 'florence',
      location: {
        lat: 43.7696,
        lng: 11.2558,
      },
    },
    {
      message: 'varna',
      location: {
        lat: 43.2141,
        lng: 27.9147,
      },
    },
    {
      message: 'munich',
      location: {
        lat: 48.1351,
        lng: 11.5820,
      },
    },
    {
      message: 'frankfurt',
      location: {
        lat: 50.1109,
        lng: 8.6821,
      },
    },
  ];
  var count = tags.length;
  tags.forEach(function(tag) {
    app.models.Tag.create(tag, function(err, createdEntry) {
      if (err) throw err;

      console.log('Created:', createdEntry);

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
});
