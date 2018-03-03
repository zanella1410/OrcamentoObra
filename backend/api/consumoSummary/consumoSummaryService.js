const _ = require('lodash')
const ConsumoGas = require('../consumoGas/consumoGas')

// Mais uma função middleware
function getSummary(req, res) {
  ConsumoGas.aggregate({
    /*
    $project: {entrada: {$sum: "$entradas.quantidade"}, leitura: {$sum: "$leituras.quantidadetq"}}
  }, {
    $group: {_id: null, entrada: {$sum: "$entrada"}, leitura: {$sum: "$leitura"}}
  }, {
    $project: {_id: 0, entrada: 1, leitura: 1}
    */
  }, function(error, result) {
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json(_.defaults(result[0], {entrada: 0, leitura: 0}))
    }
  })
}

module.exports = { getSummary }
