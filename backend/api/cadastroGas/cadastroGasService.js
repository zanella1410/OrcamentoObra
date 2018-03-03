const _ = require('lodash')
const CadastroGas = require('./cadastroGas')

CadastroGas.methods(['get', 'post', 'put', 'delete'])
CadastroGas.updateOptions({new: true, runValidators: true})

CadastroGas.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

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
CadastroGas.route('count', function(req, res, next) {
    CadastroGas.count(function(error, value) {
      if(error) {
        res.status(500).json({errors: [error]})
      } else {
        res.json({value})
      }
    })
  })

module.exports = CadastroGas