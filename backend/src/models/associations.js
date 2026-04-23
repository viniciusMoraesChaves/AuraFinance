const Usuario = require('./User')
const Transacao = require('./Transacao')
const CategoriaTransacao = require('./CategoriaTransacao')

Usuario.hasMany(Transacao, {
    foreignKey: 'id_usuario'
})

Transacao.belongsTo(Usuario, {
    foreignKey: 'id_usuario'
})

CategoriaTransacao.hasMany(Transacao, {
    foreignKey: 'id_categoria'
})

Transacao.belongsTo(CategoriaTransacao, {
    foreignKey: 'id_categoria'
})

module.exports = {
    Usuario,
    Transacao,
    CategoriaTransacao
}