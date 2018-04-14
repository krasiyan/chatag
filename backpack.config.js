'use strict';

const path = require('path');
const fs = require('fs');
const debugName = 'webpack';
const debug = require('debug');
const argv = require('yargs').argv;
const temp = require('temp').track();
const nodeExternals = require('webpack-node-externals');

const paths = {
  projectRoot: __dirname,
  appRoot: path.join(__dirname, 'server'),
};

module.exports = {
  // config partially lifted from https://github.com/zamb3zi/loopback-webpack-example
  webpack: (config, options, webpack) => {
    var bootOptions = {
      appRootDir: paths.appRoot,
    };
    var compile = require('loopback-boot/lib/compiler');
    var ins = compile(bootOptions);

    // rewrite all paths relative to the project root.
    var relative = function(p) {
      return './' + path.relative(paths.projectRoot, p).replace(/\\/g, '/');
    };
    var relativeSourceFiles = function(arr) {
      if (!arr) return;
      arr.forEach(function(item) {
        if (item.sourceFile)
          item.sourceFile = relative(item.sourceFile);
      });
    };
    relativeSourceFiles(ins.models);
    relativeSourceFiles(ins.components);
    var middleware = ins.middleware && ins.middleware.middleware;
    relativeSourceFiles(middleware);
    var bootFiles = ins.files && ins.files.boot;
    if (bootFiles) {
      bootFiles = ins.files.boot = bootFiles.map(relative);
    }
    var instructionsFile = temp.openSync({
      prefix: 'boot-instructions-',
      suffix: '.json',
    });
    fs.writeSync(instructionsFile.fd, JSON.stringify(ins, null, '\t'));
    fs.closeSync(instructionsFile.fd);

    // Construct the dependency map for loopback-boot. It resolves all of the
    // dynamic module dependencies specified by the boot instructions:
    //  * model definition js files
    //  * component dependencies
    //  * middleware dependencies
    //  * boot scripts
    //  Note: model JSON files are included in the instructions themselves so
    //  are not bundled directly.
    var dependencyMap = {};
    var resolveSourceFiles = function(arr) {
      if (!arr) return;
      arr.forEach(function(item) {
        if (item.sourceFile)
          dependencyMap[item.sourceFile] =
            path.resolve(paths.projectRoot, item.sourceFile);
      });
    };
    resolveSourceFiles(ins.models);
    resolveSourceFiles(ins.components);
    resolveSourceFiles(middleware);
    (bootFiles || []).forEach(function(boot) {
      dependencyMap[boot] = path.resolve(paths.projectRoot, boot);
    });

    config.entry.main = './server/server.js';
    config.output.path = path.join(process.cwd(), 'build/server');
    config.context = paths.projectRoot;
    config.externals = [
      nodeExternals({
        whitelist: [/^loopback-boot/],
      }),
    ];
    config.resolve.alias = {
      'boot-instructions.json': instructionsFile.path,
    };
    config.plugins.push(new webpack.ContextReplacementPlugin(
      /\bloopback-boot[\/\\]lib/,
      '',
      dependencyMap
    ));
    config.module.exprContextCritical = false;
    config.module.loaders = [
      {
        test: [/\.json$/i],
        loader: 'json-loader',
      },
    ];

    return config;
  },
};
