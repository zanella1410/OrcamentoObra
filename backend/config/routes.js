const express = require('express')
const auth = require('./auth')

module.exports = function (server) {

    /*
 * Rotas abertas
 */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    /*
  * Rotas protegidas por Token JWT
  */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    // rotas da API
  
    const consumoGasService = require('../api/consumoGas/consumoGasService')
    consumoGasService.register(protectedApi, '/consumoGases')

    const cadastroGasService = require('../api/cadastroGas/cadastroGasService')
    cadastroGasService.register(protectedApi, '/cadastroGases')

    const entradaGasService = require('../api/entradaGas/entradaGasService')
    entradaGasService.register(protectedApi, '/entradaGases')

    const leituraGasService = require('../api/leituraGas/leituraGasService')
    leituraGasService.register(protectedApi, '/leituraGases')

   
    const consumoSummaryService = require('../api/consumoSummary/consumoSummaryService')
   protectedApi.route('/consumoSummary').get(consumoSummaryService.getSummary)

    /*

      const billingSummaryService =
    require('../api/billingSummary/billingSummaryService')
  protectedApi.route('/billingSummary').get(billingSummaryService.getSummary)
    */

}


