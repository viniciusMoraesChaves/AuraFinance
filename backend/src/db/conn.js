const { Sequelize } = require ('sequelize') //sequelize minúsculo = conexão (instância)

const sequelize = new Sequelize ('aurafinance', 'root', '', { //Sequelize maiúsculo = classe
    host:'localhost',
    dialect: 'mysql',
})

async function testConnection() {
try {
     await sequelize.authenticate()
    console.log('Conectamos com sucesso!')
}catch(err){
    console.log(`não foi possivel se conectar: ${err}`)
}
}

testConnection()

module.exports = sequelize