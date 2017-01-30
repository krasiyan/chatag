module.exports = function (angel) {
  angel.on('watch', function (angel, next) {
    var exec = require('child_process').exec
    var path = require('path')
    var loadDNA = require('organic-dna-loader')
    var parallel = require('organic-stem-devtools/lib/parallel-exec')
    var isOSX = require('organic-stem-devtools/lib/os').isOSX

    // load configuration
    loadDNA(function (err, dna) {
      if (err) return next(err)
      var options = dna.client.build

      // link watch (default /build/current -> /public/release)
      var cwd = process.cwd()
      var watchedDir = path.join(cwd, options.dest.watch)
      var destLinkDir = path.join(cwd, options.dest.link)
      exec([
        'rm -rf ' + watchedDir,
        'ln ' + (isOSX ? '-sf' : '-sfT') + ' ' + watchedDir + ' ' + destLinkDir
      ].join(' && '), function (err) {
        if (err) return next(err)
        console.info('linked ' + options.dest.watch + ' -> ' + options.dest.link)

        // run in parallel watch pipelines
        parallel([
          'node ./node_modules/.bin/angel watchjs',
          'node ./node_modules/.bin/angel watchcss',
          'node ./node_modules/.bin/angel watchassets'
        ], next)
      })
    })
  })

  angel.on('watch :part', function (angel, next) {
    var parallel = require('organic-stem-devtools/lib/parallel-exec')

    // run in parallel watch pipelines
    parallel([
      'node ./node_modules/.bin/angel watchjs "' + angel.cmdData.part + '"',
      'node ./node_modules/.bin/angel watchcss',
      'node ./node_modules/.bin/angel watchassets'
    ], next)
  })
}
