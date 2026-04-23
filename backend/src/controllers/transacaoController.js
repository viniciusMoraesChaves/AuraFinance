const Transacao = require('../models/Transacao')
const CategoriaTransacao = require('../models/CategoriaTransacao')
const User = require('../models/User')

module.exports = class transacaoController {
    static async createTransacao(req, res) {
        try {
            const {
                id_usuario,
                id_categoria,
                descricao,
                status,
                recorrente,
                data,
                valor,
                entrada_saida
            } = req.body

            /* os if vão retornar erro se a pessoa não digitou nada, ou se ela digitou como por ex uma letra inves de um numero na idade */
            if (!id_usuario) { 
                return res.status(400).json({ message: 'O id do usuário é obrigatório!' })
            }

            if (!id_categoria) {
                return res.status(400).json({ message: 'O id da categoria é obrigatório!' })
            }

            if (!descricao) {
                return res.status(400).json({ message: 'A descrição é obrigatória!' })
            }

            if (!status) {
                return res.status(400).json({ message: 'O status é obrigatório!' })
            }

            if (!data) {
                return res.status(400).json({ message: 'A data é obrigatória!' })
            }

            /* verifica se não veio valor, se veio null ou se veio vazio */
            if (valor === undefined || valor === null || valor === '') { 
                return res.status(400).json({ message: 'O valor é obrigatório!' })
            }

            if (isNaN(valor)) { /* isNaN = is not a number*/
                return res.status(400).json({ message: 'O valor deve ser numérico!' })
            }

            if (entrada_saida === undefined || entrada_saida === null) {
                return res.status(400).json({ message: 'O campo entrada_saida é obrigatório!' })
            }

            /* vai verificar se o uuário existe mesmo */
            const usuarioExiste = await User.findByPk(id_usuario) 

            if (!usuarioExiste) {
                return res.status(404).json({ message: 'Usuário não encontrado!' })
            }

            /* Verifica se a categoria existe */
            const categoriaExiste = await CategoriaTransacao.findByPk(id_categoria) 

            if (!categoriaExiste) {
                return res.status(404).json({ message: 'Categoria não encontrada!' })
            }

            /* criação de nova transação */
            const novaTransacao = await Transacao.create({ 
                id_usuario,
                id_categoria,
                descricao,
                status,
                recorrente: recorrente ?? false, /* Se tiver valor vai usar ele e se não for vai usar o false */
                data,
                valor,
                entrada_saida
            })

            /* Usamos o ?? em vez de || pq o ?? considera o null e undefined e o || considera false, 0, "" e null */

            return res.status(201).json({
                message: 'Transação criada com sucesso!',
                transacao: novaTransacao
            })

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao criar transação',
                error: error.message
            })
        }
    }
}