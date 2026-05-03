require('dotenv').config() // isso aqui serve para importar o arquivo .env nosso, onde estao as informacoes sensiveis (como dados de token de cada usuario) (basicamente é uma senha/chave para gerar os tokens de autenticacao)

const conn = require('./db/conn')
require('./models/associations') // ajuste o nome se seu arquivo tiver outro nome

const app = require("./app");

const PORT = process.env.PORT || 3000;


conn.sync()
  .then(() => {
    console.log(' Tabelas sincronizadas')

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

  })
  .catch((err) => {
    console.error(' Erro ao sincronizar tabelas:', err)
  })

