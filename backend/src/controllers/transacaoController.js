const Transacao = require('../models/Transacao')
const CategoriaTransacao = require('../models/CategoriaTransacao')
const User = require('../models/User')

module.exports = class transacaoController {
    static async createTransacao(req, res) {
        try {
            const {
                id_categoria,
                descricao,
                status,
                recorrente,
                data,
                valor,
                entrada_saida
            } = req.body

            const id_usuario = req.user.id

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


   static async listTransacao(req, res) {
    try {

        // Pegando filtros opcionais enviados pela URL
        const { id_categoria, entrada_saida, status } = req.query

        // Pegando o ID do usuário autenticado
        // Tenta buscar como id ou id_usuario
        const id_usuario = req.user?.id || req.user?.id_usuario

        // Se não encontrou ID no token
        if (!id_usuario) {
            return res.status(401).json({
                message: 'Usuário não autenticado ou token inválido!'
            })
        }

        // Filtro principal:
        // Sempre listar somente transações do usuário logado
        const where = {
            id_usuario: id_usuario
        }

        // Se vier categoria
        if (id_categoria) {
            where.id_categoria = id_categoria
        }

        // Se vier entrada ou saída
        // 0 = saída
        // 1 = entrada
        if (entrada_saida !== undefined) {
            where.entrada_saida = Number(entrada_saida)
        }

        // Se vier status
        if (status) {
            where.status = status
        }

        // Busca no banco
        const transacoes = await Transacao.findAll({
            where
        })

        // Retorno sucesso
        return res.status(200).json({
            message: 'Transações listadas com sucesso!',
            transacoes
        })

    } catch (error) {

        // Erro interno
        return res.status(500).json({
            message: 'Erro ao listar transações',
            error: error.message
        })

    }
}

/* editar transação*/ 
static async editTransacao(req, res) {
    try {
        const { id } = req.params /* pega o id da URL */

        const {
            id_categoria,
            descricao,
            status,
            recorrente,
            data,
            valor,
            entrada_saida
        } = req.body

        const id_usuario = req.user?.id || req.user?.id_usuario /* aqui só vai pegar usuário que for logado, por id ou id_usuario*/

        if (!id_usuario) {
            return res.status(401).json({
                message: 'Usuário não autenticado ou token inválido!'
            })
        }

        /* busca a transação, aqui procura o id e se ele é desse usuário mesmo*/
        const transacao = await Transacao.findOne({
            where: {
                id_transacao: id,
                id_usuario: id_usuario
            }
        })

        if (!transacao) {
            return res.status(404).json({
                message: 'Transação não encontrada!'
            })
        }
        /* usamos o !== pq se usar só o == e vier vazia ou falso pode dar erro no programa */
        if (id_categoria !== undefined) {
            const categoriaExiste = await CategoriaTransacao.findByPk(id_categoria)

            if (!categoriaExiste) {
                return res.status(404).json({
                    message: 'Categoria não encontrada!'
                })
            }

            transacao.id_categoria = id_categoria
        }

        if (descricao !== undefined) { 
            if (!descricao) {
                return res.status(400).json({
                    message: 'A descrição não pode ser vazia!'
                })
            }

            transacao.descricao = descricao
        }

        if (status !== undefined) {
            if (!status) {
                return res.status(400).json({
                    message: 'O status não pode ser vazio!'
                })
            }

            transacao.status = status
        }

        if (recorrente !== undefined) { /* pode ser verdadeiro ou falso */
            transacao.recorrente = recorrente
        }

        if (data !== undefined) {
            if (!data) {
                return res.status(400).json({
                    message: 'A data não pode ser vazia!'
                })
            }

            /* fiz uma pesquisa e como o banco esta em inglês usar a data assim é melhor*/
            const dataRegex = /^\d{4}-\d{2}-\d{2}$/  

            if (!dataRegex.test(data)) {
                return res.status(400).json({
                    message: 'A data deve estar no formato YYYY-MM-DD!'
                })
            }

            transacao.data = data
        }

        if (valor !== undefined) {
            if (valor === null || valor === '') {
                return res.status(400).json({
                    message: 'O valor não pode ser vazio!'
                })
            }

            if (isNaN(valor)) {
                return res.status(400).json({
                    message: 'O valor deve ser numérico!'
                })
            }

            transacao.valor = valor
        }

        if (entrada_saida !== undefined) {
            if (entrada_saida === null || entrada_saida === '') {
                return res.status(400).json({
                    message: 'O campo entrada_saida não pode ser vazio!'
                })
            }

            transacao.entrada_saida = entrada_saida
        }

        await transacao.save()  /* salva as alterações */

        return res.status(200).json({
            message: 'Transação editada com sucesso!',
            transacao
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao editar transação',
            error: error.message
        })
    }
}
    static async deleteTransacao(req, res) {
    try {
        const { id } = req.params

        const id_usuario = req.user?.id || req.user?.id_usuario

        const transacao = await Transacao.findOne({
            where: {
                id_transacao: id,
                id_usuario: id_usuario
            }
        })

        if (!transacao) 
        {
            return res.status(404).json({message: 'Transação não encontrada ou não pertence a este usuário!'})
        }

        await transacao.destroy()

        return res.status(200).json({message: 'Transação deletada com sucesso!'})

    } catch (error) {
        return res.status(500).json({message: 'Erro ao deletar transação',error: error.message})

    }
    }
}

