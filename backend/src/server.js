require('dotenv').config() // isso aqui serve para importar o arquivo .env nosso, onde estao as informacoes sensiveis (como dados de token de cada usuario) (basicamente é uma senha/chave para gerar os tokens de autenticacao)

const conn = require('./db/conn')
const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  
});