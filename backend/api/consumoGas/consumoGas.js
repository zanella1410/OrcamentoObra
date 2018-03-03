const restful = require('node-restful')
const mongoose = restful.mongoose


const entradaSchema = new mongoose.Schema({
  data: { type: Date, default: Date.now },
  quantidade: { type: Number, min: 0, required: [true, 'Informe a quantidade!'] },
  vlunitario: { type: Number, min: 0, required: [true, 'Informe o valor unitário!'] },
  percentual: { type: Number, min: 0, required: false },
  observacao: { type: String, required: false }

})

const leituraSchema = new mongoose.Schema({
  data: { type: Date, default: Date.now },
  quantidadetq: { type: Number, min: 0, required: [true, 'Informe a quantidade!'] },
  vlunitario: { type: Number, min: 0, required: [true, 'Informe o valor unitário!'] },
  consumo: { type: Number, min: 0, required: false },
  percentual: { type: Number, min: 0, required: false },
  observacao: { type: String, required: false }
})

/*
const cadastroGasSchema = new mongoose.Schema({
  gas: { type: String, required: [true, 'Informe o gás!'] },
  estoque: { type: Number, min: 0, required: [true, 'Informe a quantidade em estoque!'] },
  estoquemin: { type: Number, min: 10, required: [true, 'Informe a quantidade do estoque mínimo!'] },
  unidademedida: {
    type: String, required: [true, 'Informe a unidade de medida!'], uppercase: true,
    enum: ['KG', 'M3']
  },
  vlunitario: { type: Number, required: [true, 'Informe o valor unitário!'] }
})
*/


const consumoGasSchema = new mongoose.Schema({
  gas: { type: String, required: [true, 'Informe o gás!'] },
  estoque: { type: Number, min: 0, required: [true, 'Informe a quantidade em estoque!'] },
  estoquemin: { type: Number, min: 10, required: [true, 'Informe a quantidade do estoque mínimo!'] },
  unidademedida: { type: String, required: [true, 'Informe a unidade de medida!'] },
  vlunitario: { type: Number, required: [true, 'Informe o valor unitário!'] },
  entradas: [entradaSchema],
  leituras: [leituraSchema]
})

//module.exports = restful.model('ConsumoGas', consumoGasSchema, 'CadastroGas', cadastroGasSchema)

module.exports = restful.model('ConsumoGas', consumoGasSchema)