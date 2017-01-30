module.exports = function (angel) {
  angel.on('develop', function (angel, next) {
    process.env.CELL_MODE = process.env.CELL_MODE || '_development'
    var parallel = require('organic-stem-devtools/lib/parallel-exec')
    parallel([
      'node ./node_modules/.bin/angel watch',
      'node ./node_modules/.bin/nodemon ./index.js'
    ])
  })

  angel.on('develop :part', function (angel, next) {
    process.env.CELL_MODE = process.env.CELL_MODE || '_development'
    var parallel = require('organic-stem-devtools/lib/parallel-exec')
    parallel([
      'node ./node_modules/.bin/angel watch "' + angel.cmdData.part + '"',
      'node ./node_modules/.bin/nodemon ./index.js'
    ])
  })
}
