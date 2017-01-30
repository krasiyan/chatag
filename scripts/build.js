module.exports = function (angel) {
  angel.on('build', function (angel, next) {
    var path = require('path')
    var exec = require('child_process').exec
    var format = require('string-template')
    var loadDNA = require('organic-dna-loader')
    var parallel = require('organic-stem-devtools/lib/parallel-exec')
    var isOSX = require('organic-stem-devtools/lib/os').isOSX

    // load configuration
    var version = require(process.cwd() + '/package.json').version
    loadDNA(function (err, dna) {
      if (err) return next(err)
      var options = dna.client.build

      // destination build folder (default /build/{version})
      var destBuildPath = format(options.dest.build, {version: version})

      // run in parallel pipelines building of client code
      parallel([
        'node ./node_modules/.bin/angel buildjs',
        'node ./node_modules/.bin/angel buildcss',
        'node ./node_modules/.bin/angel buildassets'
      ], function (err) {
        if (err) return next(err)

        // link build (default /build/{version} -> /public/release)
        console.info('linking ' + destBuildPath + ' -> ' + options.dest.link)
        var cwd = process.cwd()
        exec('ln ' + (isOSX ? '-sf' : '-sfT') + ' ' + path.join(cwd, destBuildPath) + ' ' + path.join(cwd, options.dest.link), next)
      })
    })
  })
}
