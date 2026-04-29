const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Objetivo = db.define('Objetivo', {
    id_objetivo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'id_usuario'
        }
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor_meta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    valor_atual: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    data_limite: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
},
{
    tableName: 'Objetivo',
    timestamps: false
})

module.exports = Objetivo