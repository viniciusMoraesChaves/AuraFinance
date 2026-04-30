const { Op } = require('sequelize')

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

        const id_usuario = req.user?.id || req.user?.id_usuario

        if (!id_usuario) {
            return res.status(401).json({ 
                message: 'Usuário não autenticado ou token inválido!' 
            })
        }

        if (!id_categoria) {
            return res.status(400).json({ 
                message: 'O id da categoria é obrigatório!' 
            })
        }

        if (!descricao) {
            return res.status(400).json({ 
                message: 'A descrição é obrigatória!' 
            })
        }

        if (!status) {
            return res.status(400).json({ 
                message: 'O status é obrigatório!' 
            })
        }

        const statusNormalizado = status
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')

        const statusPermitidos = ['pendente', 'concluida', 'cancelada']

        if (!statusPermitidos.includes(statusNormalizado)) {
            return res.status(400).json({
                message: 'Status inválido! Use: pendente, concluída ou cancelada.'
            })
        }

        let statusFinal

        if (statusNormalizado === 'concluida') {
            statusFinal = 'concluída'
        } else {
            statusFinal = statusNormalizado
        }

        if (!data) {
            return res.status(400).json({ 
                message: 'A data é obrigatória!' 
            })
        }

        const dataRegex = /^\d{4}-\d{2}-\d{2}$/

        if (!dataRegex.test(data)) {
            return res.status(400).json({ 
                message: 'A data deve estar no formato YYYY-MM-DD!' 
            })
        }

        if (valor === undefined || valor === null || valor === '') {
            return res.status(400).json({ 
                message: 'O valor é obrigatório!' 
            })
        }

        if (isNaN(valor)) {
            return res.status(400).json({ 
                message: 'O valor deve ser numérico!' 
            })
        }

        if (entrada_saida === undefined || entrada_saida === null || entrada_saida === '') {
            return res.status(400).json({ 
                message: 'O campo entrada_saida é obrigatório!' 
            })
        }

        let entradaSaidaNormalizado

        if (entrada_saida === true || entrada_saida === 'true') {
            entradaSaidaNormalizado = 1
        } else if (entrada_saida === false || entrada_saida === 'false') {
            entradaSaidaNormalizado = 0
        } else {
            entradaSaidaNormalizado = Number(entrada_saida)
        }

        if (![0, 1].includes(entradaSaidaNormalizado)) {
            return res.status(400).json({
                message: 'O campo entrada_saida deve ser 0/1 ou true/false!'
            })
        }

        const usuarioExiste = await User.findByPk(id_usuario)

        if (!usuarioExiste) {
            return res.status(404).json({ 
                message: 'Usuário não encontrado!' 
            })
        }

        const categoriaExiste = await CategoriaTransacao.findByPk(id_categoria)

        if (!categoriaExiste) {
            return res.status(404).json({ 
                message: 'Categoria não encontrada!' 
            })
        }

        const novaTransacao = await Transacao.create({
            id_usuario,
            id_categoria,
            descricao,
            status: statusFinal,
            recorrente: recorrente ?? false,
            data,
            valor,
            entrada_saida: entradaSaidaNormalizado
        })

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
        const { id_categoria, entrada_saida, status, data_inicio, data_fim, page = 1, limit = 5 } = req.query

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


         //  NOVO: filtro por período CHAT
        // filtro por período
        if (data_inicio || data_fim) {

         where.data = {}

        if (data_inicio) {
        where.data[Op.gte] = data_inicio // maior ou igual
        }

        if (data_fim) {
        where.data[Op.lte] = data_fim // menor ou igual
        }
    }

        //  essa paginacao é para que na tela de transacoes apareca de 5 em 5 as transacoes, assim fica exatamente o que o front mostra
        const paginaAtual = Number(page)
        const limitePorPagina = Number(limit)
        const offset = (paginaAtual - 1) * limitePorPagina

        const { count, rows } = await Transacao.findAndCountAll({
            where,
            include: [
                {
                    model: CategoriaTransacao,
                    attributes: ['id_categoria', 'nome'] // traz nome da categoria
                }
            ],
            limit: limitePorPagina,
            offset: offset,
            order: [['data', 'DESC']]
        })

        
        return res.status(200).json({
        message: 'Transações listadas com sucesso!',
        totalTransacoes: count,
        paginaAtual: paginaAtual,
        totalPaginas: Math.ceil(count / limitePorPagina),
        transacoes: rows
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

            const statusNormalizado = status
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')

            const statusPermitidos = ['pendente', 'concluida', 'cancelada']

            if (!statusPermitidos.includes(statusNormalizado)) {
                return res.status(400).json({
                    message: 'Status inválido! Use: pendente, concluída ou cancelada.'
                })
            }

            let statusFinal

            if (statusNormalizado === 'concluida') {
                statusFinal = 'concluída'
            } else {
                statusFinal = statusNormalizado
            }

            transacao.status = statusFinal
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

            let entradaSaidaNormalizado

            if (entrada_saida === true || entrada_saida === 'true') {
                entradaSaidaNormalizado = 1
            } else if (entrada_saida === false || entrada_saida === 'false') {
                entradaSaidaNormalizado = 0
            } else {
                entradaSaidaNormalizado = Number(entrada_saida)
            }

            if (![0, 1].includes(entradaSaidaNormalizado)) {
                return res.status(400).json({
                    message: 'O campo entrada_saida deve ser 0/1 ou true/false!'
                })
            }

            transacao.entrada_saida = entradaSaidaNormalizado
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

    static async listCategorias(req, res) {
    
    try 
    {
        const categorias = await CategoriaTransacao.findAll({order: [['nome', 'ASC']]})
        return res.status(200).json({message: 'Categorias listadas com sucesso!',categorias})
   
    } catch (error) {
        return res.status(500).json({message: 'Erro ao listar categorias',error: error.message})
    }

    }

    // resumo financeiro transacao (total de entradas, total de saidas, saldo total)
    static async resumoTransacao(req,res) {

        try 
        {
            const id_usuario = req.user?.id || req.user?.id_usuario

        if (!id_usuario) 
        {
            return res.status(401).json({message: 'Usuário não autenticado!'})
        }

        const transacoes = await Transacao.findAll({where: {id_usuario}})

        let totEntrada = 0
        let totSaida = 0

        transacoes.forEach(transacao => {
             const valor = Number(transacao.valor)

            if (transacao.entrada_saida === true || transacao.entrada_saida === 1) {
                totEntrada += valor
            } else {
                totSaida += valor
            }
        })

         const saldoLiquido = totEntrada - totSaida

        return res.status(200).json({saldoLiquido,totEntrada,totSaida})

    } catch(error)
    {
        return res.status(500).json({message: 'Erro ao gerar resumo financeiro',error: error.message})
    }
}

    static async gastoCategoria(req,res) {

        try {

            const id_usuario = req.user?.id || req.user?.id_usuario

            if (!id_usuario) 
            {  
                return res.status(401).json({message: 'Usuário não autenticado!'})
            }

            const transacoes = await Transacao.findAll({
            where: {
                id_usuario,
                entrada_saida: 0
            },
            include: [{
                model: CategoriaTransacao,
                attributes: ['nome']
            }]
        })

        const gastos = {}
        let totalSaidas = 0

        transacoes.forEach(t => {
            const nome = t.CategoriaTransacao.nome
            const valor = Number(t.valor)

            totalSaidas += valor

            if (!gastos[nome]) {
                gastos[nome] = 0
            }

            gastos[nome] += valor
        })

        const resultado = Object.keys(gastos).map(nome => {
            const valor = gastos[nome]

            return {
                categoria: nome,
                valor,
                porcentagem: ((valor / totalSaidas) * 100).toFixed(1)
            }
        })

        return res.status(200).json({
            totalSaidas,
            gastosPorCategoria: resultado
        })

        } catch(error)
        {
            return res.status(500).json({message: 'Erro ao gerar gasto por categoria',error: error.message})
        }
    }


}
