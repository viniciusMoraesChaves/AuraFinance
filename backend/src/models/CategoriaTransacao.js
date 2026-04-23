const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const CategoriaTransacao = db.define('CategoriaTransacao', {

    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},
{
  tableName: 'Categoria_Transacao',
  timestamps: false
})

module.exports = CategoriaTransacao