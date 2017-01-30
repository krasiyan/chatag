module.exports = function (angel) {
  angel.on('buildcss', function () {
    var loadDNA = require('organic-dna-loader')
    var runPipeline = require('organic-stem-devtools/lib/gulp-pipeline')
    var less = require('gulp-less')
    var format = require('string-template')
    var glob2base = require('organic-stem-devtools/lib/glob2base')
    var path = require('path')

    var LessPluginAutoPrefix = require('less-plugin-autoprefix')

    // load configuration
    var version = require(process.cwd() + '/package.json').version
    loadDNA(function (err, dna) {
      if (err) return console.error(err)
      var options = dna.client.build

      // run the css pipeline on every bundle
      runPipeline({
        name: 'buildcss',
        src: path.join(process.cwd(), options['css'].src),
        rootDir: path.join(process.cwd(), glob2base(options['css'].src)),
        pipeline: [
          less({
            verbose: true,
            plugins: [ new LessPluginAutoPrefix() ],
            compress: true
          })
        ],
        dest: format(options.dest.build, {version: version}),
        exitOnError: true
      }).on('end', function () {
        console.log('css build successfully')
      })
    })
  })
}
