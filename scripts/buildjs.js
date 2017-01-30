module.exports = function (angel) {
  angel.on('buildjs', function () {
    var loadDNA = require('organic-dna-loader')
    var webpack = require('webpack')
    var path = require('path')
    var glob2base = require('organic-stem-devtools/lib/glob2base')
    var format = require('string-template')
    var globby = require('globby')
    var standardErrorHandler = require('organic-stem-devtools/lib/gulp-error-notifier')({
      name: 'buildjs'
    })

    var webpackRunHandler = function (err, stats) {
      if (err) return standardErrorHandler(err)
      var jsonStats = stats.toJson()
      if (jsonStats.errors.length > 0) {
        return jsonStats.errors.map(standardErrorHandler)
      }
      if (jsonStats.warnings.length > 0) {
        console.info(jsonStats.warnings.join('\n'))
      }
      console.info('buildjs', stats.toString({
        chunks: false,
        colors: false
      }))
      console.info('js build successfully')
    }

    var version = require(process.cwd() + '/package.json').version
    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.build
      var config = {}
      if (options.js.webpack) {
        config = require(path.join(process.cwd(), options.js.webpack))
      }
      config.devtool = '#source-map'
      config.plugins = config.plugins || []
      config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
          semicolons: true
        }
      }))
      config.output = {
        path: format(options.dest.build, {version: version}),
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
        webpack(config).run(webpackRunHandler)
      })
    })
  })
}
