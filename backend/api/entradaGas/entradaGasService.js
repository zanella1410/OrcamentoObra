const _ = require('lodash')
const EntradaGas = require('./entradaGas')

EntradaGas.methods(['get', 'post', 'put', 'delete'])
EntradaGas.updateOptions({new: true, runValidators: true})

EntradaGas.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

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
EntradaGas.route('count', function(req, res, next) {
    EntradaGas.count(function(error, value) {
      if(error) {
        res.status(500).json({errors: [error]})
      } else {
        res.json({value})
      }
    })
  })

module.exports = EntradaGas