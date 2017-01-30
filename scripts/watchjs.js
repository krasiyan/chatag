module.exports = function (angel) {
  angel.on('watchjs', function () {
    var loadDNA = require('organic-dna-loader')
    var webpack = require('webpack')
    var path = require('path')
    var glob2base = require('organic-stem-devtools/lib/glob2base')
    var globby = require('globby')
    var standardErrorHandler = require('organic-stem-devtools/lib/gulp-error-notifier')({
      name: 'watchjs'
    })

    var webpackWatchHandler = function (err, stats) {
      if (err) return standardErrorHandler(err)
      var jsonStats = stats.toJson()
      if (jsonStats.errors.length > 0) {
        return jsonStats.errors.map(standardErrorHandler)
      }
      if (jsonStats.warnings.length > 0) {
        console.info(jsonStats.warnings.join('\n'))
      }
      console.info('watchjs', stats.toString({
        chunks: false,
        colors: false
      }))
      console.info('js build successfully')
    }

    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.build
      var config = {}
      if (options.js.webpack) {
        config = require(path.join(process.cwd(), options.js.webpack))
      }

      config.devtool = '#cheap-module-eval-source-map'
      config.output = {
        path: options.dest.watch,
        filename: '[name]'
      }
      var pattern = path.join(process.cwd(), options['js'].src)
      globby(pattern).then(function (paths) {
        var rootDir = glob2base(pattern)
        var entries = {}
        paths.forEach(function (p) {
          entries[p.replace(rootDir, '')] = p
        })
        config.entry = entries
        webpack(config).watch({}, webpackWatchHandler)
      })
    })
  })

  angel.on('watchjs :part', function (angel) {
    var loadDNA = require('organic-dna-loader')
    var webpack = require('webpack')
    var path = require('path')
    var glob2base = require('organic-stem-devtools/lib/glob2base')
    var glob2filename = require('organic-stem-devtools/lib/glob2filename')
    var globby = require('globby')
    var standardErrorHandler = require('organic-stem-devtools/lib/gulp-error-notifier')({
      name: 'watchjs'
    })

    var webpackWatchHandler = function (err, stats) {
      if (err) return standardErrorHandler(err)
      var jsonStats = stats.toJson()
      if (jsonStats.errors.length > 0) {
        return jsonStats.errors.map(standardErrorHandler)
      }
      if (jsonStats.warnings.length > 0) {
        console.info(jsonStats.warnings.join('\n'))
      }
      console.info('watchjs', stats.toString({
        chunks: false,
        colors: false
      }))
      console.info('js build successfully')
    }

    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.build
      var config = {}
      if (options.js.webpack) {
        config = require(path.join(process.cwd(), options.js.webpack))
      }

      config.devtool = '#cheap-module-eval-source-map'
      config.output = {
        path: options.dest.watch,
        filename: '[name]'
      }

      var srcRoot = glob2base(options['js'].src)
      var srcFilename = glob2filename(options['js'].src)

      var pattern = path.join(process.cwd(), srcRoot + angel.cmdData.part + srcFilename)
      globby(pattern).then(function (paths) {
        var entries = {}
        paths.forEach(function (p) {
          entries[p.replace(path.join(process.cwd(), srcRoot), '')] = p
        })
        config.entry = entries
        webpack(config).watch({}, webpackWatchHandler)
      })
    })
  })
}
