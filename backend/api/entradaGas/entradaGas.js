const restful = require('node-restful')
const mongoose = restful.mongoose

const entradaGasSchema = new mongoose.Schema({
  data: { type: Date, default: Date.now },
  gas:  { type: String, required: [true, 'Selecione o gás!'] },
  unidademedida: { type: String, required: [true, 'Informe a unidade de medida!'], uppercase: true,
    enum: ['KG', 'M3'] },
  vlunitario: { type: Number, required: [true, 'Informe o valor unitário!'] },
  quantidade: { type: Number, min: 0, required: [true, 'Informe a quantidade!'] },
  percentual: { type: Number, min: 0, required: [true, 'Informe o percentual do tanque!'] }
}) 

module.exports = restful.model('EntradaGas', entradaGasSchema)