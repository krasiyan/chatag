'use strict';

const path = require('path');

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/server.js';
    config.output.path = path.join(process.cwd(), 'build/server');

    return config;
  },
};
