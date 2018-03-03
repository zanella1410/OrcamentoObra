const _ = require('lodash')
const LeituraGas = require('./leituraGas')

LeituraGas.methods(['get', 'post', 'put', 'delete'])
LeituraGas.updateOptions({new: true, runValidators: true})

LeituraGas.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
  const bundle = res.locals.bundle

  if(bundle.errors) {
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  } else {
    next()
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

// paginação -- contador
LeituraGas.route('count', function(req, res, next) {
    LeituraGas.count(function(error, value) {
      if(error) {
        res.status(500).json({errors: [error]})
      } else {
        res.json({value})
      }
    })
  })

module.exports = LeituraGas