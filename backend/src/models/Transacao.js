const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Transacao = db.define('Transacao', {
    id_transacao: {
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
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Categoria_Transacao',
            key: 'id_categoria'
        }
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recorrente: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    entrada_saida: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
{
    tableName: 'Transacao',
    timestamps: false
})

module.exports = Transacao