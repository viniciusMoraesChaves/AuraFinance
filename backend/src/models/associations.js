const Usuario = require('./User')
const Transacao = require('./Transacao')
const CategoriaTransacao = require('./CategoriaTransacao')
const Objetivo = require('./Objetivo')

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

Usuario.hasMany(Objetivo, {
    foreignKey: 'id_usuario'
})

Objetivo.belongsTo(Usuario, {
    foreignKey: 'id_usuario'
})

module.exports = {
    Usuario,
    Transacao,
    CategoriaTransacao,
    Objetivo
}