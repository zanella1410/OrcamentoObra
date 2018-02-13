const express = require('express')

module.exports = function (server) {

// API Routes
const router = express.Router()
server.use('/api', router)

// rotas da API
const orcamentoObraService = require('../api/orcamentoObra/orcamentoObraService')
orcamentoObraService.register(router, '/orcamentoObras')

const orcamentoSummaryService = require('../api/orcamentoSummary/orcamentoSummaryService')
router.route('/orcamentoSummary').get(orcamentoSummaryService.getSummary)

}


