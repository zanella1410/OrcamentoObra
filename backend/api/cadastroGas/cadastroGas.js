const restful = require('node-restful')
const mongoose = restful.mongoose

const cadastroGasSchema = new mongoose.Schema({
  gas:  { type: String, required: [true, 'Informe o gás!'] },
  estoque: { type: Number, min: 0, required: [true, 'Informe a quantidade em estoque!'] },
  estoquemin: { type: Number, min: 10, required: [true, 'Informe a quantidade do estoque mínimo!'] },
  unidademedida: { type: String, required: [true, 'Informe a unidade de medida!'], uppercase: true,
    enum: ['KG', 'M3'] },
  vlunitario: { type: Number, required: [true, 'Informe o valor unitário!'] },
  capacidadetanque: { type: Number, min: 0, required: [true, 'Informe a capacidade do tanque!'] },
  vlcalculo: { type: Number, min: 0, required: [true, 'Informe a valor de cálculo!'] },
}) 

module.exports = restful.model('CadastroGas', cadastroGasSchema)