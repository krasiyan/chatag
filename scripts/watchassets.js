module.exports = function (angel) {
  angel.on('watchassets', function (angel) {
    var loadDNA = require('organic-dna-loader')
    var runPipeline = require('organic-stem-devtools/lib/gulp-pipeline')
    var format = require('string-template')
    var path = require('path')
    var watch = require('gulp-watch')
    var glob2base = require('organic-stem-devtools/lib/glob2base')

    var version = require(process.cwd() + '/package.json').version
    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.build
      if (!options.assets || options.assets.length === 0) return
      options.assets.forEach(function (asset) {
        var destPath = options.dest.watch
        if (asset.dest) {
          destPath = path.join(destPath, asset.dest)
        }
        runPipeline({
          name: 'watchassets',
          src: path.join(process.cwd(), asset.src),
          rootDir: path.join(process.cwd(), glob2base(asset.src)),
          pipeline: [
            watch(asset.src)
          ],
          dest: format(destPath, {version: version}),
          exitOnError: true
        }).on('end', function () {
          console.log('assets watch successfully')
        })
      })
    })
  })
}
