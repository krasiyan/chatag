'use strict';

const path = require('path');
const fs = require('fs');
const debugName = 'webpack';
const debug = require('debug');
const argv = require('yargs').argv;
const nodeExternals = require('webpack-node-externals');
const VirtualModulePlugin = require('virtual-module-webpack-plugin');
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin');

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
    var bootInstructions = compile(bootOptions);

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
    relativeSourceFiles(bootInstructions.models);
    relativeSourceFiles(bootInstructions.components);
    relativeSourceFiles(bootInstructions.middleware.middleware);
    var bootFiles = bootInstructions.files && bootInstructions.files.boot;
    if (bootFiles) {
      bootFiles = bootInstructions.files.boot = bootFiles.map(relative);
    }

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
    resolveSourceFiles(bootInstructions.models);
    resolveSourceFiles(bootInstructions.components);
    resolveSourceFiles(bootInstructions.middleware.middleware);
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
    config.plugins.push(new webpack.ContextReplacementPlugin(
      /\bloopback-boot[\/\\]lib/,
      '',
      dependencyMap
    ));
    config.plugins.push(new VirtualModulePlugin({
      moduleName: 'server/boot-instructions.json',
      contents: bootInstructions,
    }));
    config.plugins.push(new CopyPkgJsonPlugin({
      remove: ['devDependencies', 'scripts', 'pre-commit'],
      replace: {
        main: 'main.js',
      },
    }));
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
