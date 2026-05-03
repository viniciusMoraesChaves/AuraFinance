const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  logging: false,
})

async function testConnection() {
  try {
    await sequelize.authenticate()
    console.log(' Conectado ao banco com sucesso!')
  } catch (err) {
    console.error(' Erro ao conectar ao banco:', err)
  }
}

testConnection()

module.exports = sequelize