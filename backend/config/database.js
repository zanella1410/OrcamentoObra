const mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb://localhost/db_neworcamentos1')

// banco com senha
// module.exports = mongoose.connect('mongodb://usuario:senha@localhost:porta/db_obras')

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'."