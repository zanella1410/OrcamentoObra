const restful = require('node-restful')
const mongoose = restful.mongoose

const usuarioSchema = new mongoose.Schema({
  nome:  { type: String, required: true },
  email: { type: String, required: true },
  perfil: { type: String, required: false, uppercase: true,
    enum: ['ADMINISTRADOR', 'REPRESENTANTE', 'ORÇAMENTISTA', 'DIREÇÃO'] },
    //enum: ['REPRESENTANTE', 'ORÇAMENTISTA', 'DIREÇÃO'] },
  senha: { type: String, required: true },
  status: { type: String, required: true, default:'ATIVO', uppercase: true,
    enum: ['ATIVO', 'BLOQUEADO', 'INATIVO'] },
  foto: { type: String, required: false }
})

const orcamentoSchema = new mongoose.Schema({
  obra:  { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  cliente: { type: String, required: true },
  status: { type: String, required: true, default:'Aguardando Orçamentista' , uppercase: false,
    enum: ['Aguardando Orçamentista','Aguardando Cliente','Aprovado','Enviado', 'Orçado','Reprovado' ] },
  arquivos: {
    nome:     {type: String, required: false },
    descricao: {type: String, required: false },
	},
  obs: { type: String, required: false }
})

const orcamentoObraSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  data: { type: Date, default: Date.now },
  usuarios: [usuarioSchema],
  orcamentos: [orcamentoSchema]
})


module.exports = restful.model('OrcamentoObra', orcamentoObraSchema)