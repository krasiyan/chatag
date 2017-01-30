module.exports = function (angel) {
  angel.on('watchcss', function (angel) {
    var loadDNA = require('organic-dna-loader')
    var runPipeline = require('organic-stem-devtools/lib/gulp-pipeline')
    var less = require('gulp-less')
    var lessWatcher = require('gulp-less-watcher')
    var globStream = require('glob-stream')
    var path = require('path')
    var glob2base = require('organic-stem-devtools/lib/glob2base')

    var LessPluginAutoPrefix = require('less-plugin-autoprefix')

    // load configuration
    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.build

      // workaround on gulp-less-watcher's ability to watch more than one src file
      var srcRoot = glob2base(options['css'].src)

      globStream.create(options['css'].src)
        .on('data', function (file) {
          var destRelative = path.dirname(file.path.replace(path.join(process.cwd(), srcRoot), ''))

          // on each bundle run the pipeline
          var config = {
            verbose: true,
            plugins: [ new LessPluginAutoPrefix() ]
          }
          runPipeline({
            name: 'watchcss',
            src: file.path,
            rootDir: path.join(process.cwd(), glob2base(options['css'].src)),
            pipeline: [
              lessWatcher(config),
              less(config)
            ],
            dest: path.join(options.dest.watch, destRelative)
          }).on('end', function () {
            console.log('css watch successfully')
          })
        })
    })
  })
}
