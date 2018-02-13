const _ = require('lodash')
const OrcamentoObra = require('../orcamentoObra/orcamentoObra')

// Mais uma função middleware - sumarizar as obras
function getSummary(req, res) {
  OrcamentoObra.aggregate({
    // aggregate - https://docs.mongodb.com/manual/reference/operator/aggregation/project/
    $project: {usuario: {$user:"$usuarios.nome"}, orcamento: {$orc: "$orcamentos.obra"}}
  }, {
   // https://docs.mongodb.com/manual/reference/operator/aggregation/group/
    $group: {_id: null, usuario: {$user: "$usuario"}, orcamento: {$orc: "$orcamento"}}
  }, {
    $project: {_id: 0, usuario: 1, orcamento: 1}
  }, function(error, result) {
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json(_.defaults(result[0], {usuario: 0, orcamento: 0}))
    }
  })
}

module.exports = { getSummary }
