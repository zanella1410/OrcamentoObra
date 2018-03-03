const mongoose = require('node-mariadb')
const connection = mongoose.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'Neve##3030',
    database : 'gas_sulmeta'
  });

  connection.connect(function(err){
  if(err) return console.log(err);
  console.log('conectou!');
  createTable(connection);



// banco com senha
// module.exports = mongoose.connect('mongodb://usuario:senha@localhost:porta/db_consumogas')

/*
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'."

*/