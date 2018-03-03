const restful = require('node-restful')
const mongoose = restful.mongoose


const leituraGasSchema = new mongoose.Schema({
  data: { type: Date, default: Date.now },
  gas:  { type: String, required: [true, 'Selecione o gás!'] },
  quantidadetq: { type: Number, min: 0, required: [true, 'Informe a leitura do tanque!'] },
  observacao: { type: String, required: false }
 
}) 

module.exports = restful.model('LeituraGas', leituraGasSchema )