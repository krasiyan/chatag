module.exports = function (angel) {
  angel.on('rollback', function (angel, next) {
    var sequence = require('organic-stem-devtools/lib/sequencial-exec')
    var path = require('path')

    var packagejson = require(path.join(process.cwd(), 'package.json'))
    var parts = packagejson.version.split('.')
    parts[2] = (parseInt(parts[2], 10) - 1).toString()
    var olderVersion = parts.join('.')

    sequence([
      'git checkout v' + olderVersion // checkout taggged version
    ], next)
  })
}
