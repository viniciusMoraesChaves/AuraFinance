const Objetivo = require('../models/Objetivo')
const User = require('../models/User')

module.exports = class objetivoController {

    /* Criar o objetivo */
    static async createObjetivo(req, res) {
        try {
            const {
                nome,
                valor_meta,
                valor_atual,
                data_limite
            } = req.body

            const id_usuario = req.user?.id || req.user?.id_usuario

            if (!id_usuario) {
                return res.status(401).json({
                    message: 'Usuário não autenticado ou token inválido!'
                })
            }

            if (!nome) {
                return res.status(400).json({
                    message: 'O nome do objetivo é obrigatório!'
                })
            }

            if (valor_meta === undefined || valor_meta === null || valor_meta === '') {
                return res.status(400).json({
                    message: 'O valor da meta é obrigatório!'
                })
            }

            if (isNaN(valor_meta)) {
                return res.status(400).json({
                    message: 'O valor da meta deve ser numérico!'
                })
            }

            if (valor_atual !== undefined && valor_atual !== null && valor_atual !== '') {
                if (isNaN(valor_atual)) {
                    return res.status(400).json({
                        message: 'O valor atual deve ser numérico!'
                    })
                }
            }

            if (data_limite) {
                const dataRegex = /^\d{4}-\d{2}-\d{2}$/

                if (!dataRegex.test(data_limite)) {
                    return res.status(400).json({
                        message: 'A data limite deve estar no formato YYYY-MM-DD!'
                    })
                }
            }

            const usuarioExiste = await User.findByPk(id_usuario)

            if (!usuarioExiste) {
                return res.status(404).json({
                    message: 'Usuário não encontrado!'
                })
            }

            const novoObjetivo = await Objetivo.create({
                id_usuario,
                nome,
                valor_meta,
                valor_atual: valor_atual ?? 0,
                data_limite
            })

            return res.status(201).json({
                message: 'Objetivo criado com sucesso!',
                objetivo: novoObjetivo
            })

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao criar objetivo',
                error: error.message
            })
        }
    }

    /* listar os objetivos */
    static async listObjetivos(req, res) {
        try {
            const id_usuario = req.user?.id || req.user?.id_usuario

            if (!id_usuario) {
                return res.status(401).json({
                    message: 'Usuário não autenticado ou token inválido!'
                })
            }

            const objetivos = await Objetivo.findAll({
                where: {
                    id_usuario: id_usuario
                },
                order: [['id_objetivo', 'DESC']]
            })

            const objetivosComCalculo = objetivos.map(obj => {

            /* converte os valores para numero */
            const valor_meta = Number(obj.valor_meta)
            const valor_atual = Number(obj.valor_atual)

            /* ja coloquei que só pode chegar a 100% */
            const progresso = valor_meta > 0 /* verifica se a meta é maior que 0 */
                ? Number(Math.min(((valor_atual / valor_meta) * 100), 100).toFixed(2)) /* se for maior que 0 ele calcula a porcentagem  */
                : 0 /* se for invalido ou a meta for 0, o progesso vira 0 */

            /* evita que a conta de negativo com o math.max */
            const faltante = Math.max(valor_meta - valor_atual, 0) /* calcula quanto falta para o progresso */

            let contribuicao_mensal = null

            if (obj.data_limite && faltante > 0) { /* verificamos se tem data limite */

                const hoje = new Date() /* pega a data atual */
                const dataLimite = new Date(obj.data_limite) /* pega a data limite */

                /* calcula os meses restantes */
                const meses = (dataLimite.getFullYear() - hoje.getFullYear()) * 12 + (dataLimite.getMonth() - hoje.getMonth())

                 if (meses > 0) {
                    contribuicao_mensal = Number((faltante / meses).toFixed(2)) /* mostra a contribuição do mes */
                }
            }

            return {
                ...obj.dataValues, /* essa parte copia todos os dados originais do objetivo que vem do banco de dados */
                progresso: Number(progresso), /* a parte de progresso é convertido para numero */
                faltante,
                contribuicao_mensal: contribuicao_mensal ?? 0,
                concluido: valor_atual >= valor_meta
            }
        })

            return res.status(200).json({
                message: 'Objetivos listados com sucesso!',
                objetivos: objetivosComCalculo
            })

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao listar objetivos',
                error: error.message
            })
        }
    }

    /* editar objetivo*/ 

    static async editObjetivo(req, res) {
    try {
        const { id } = req.params

        const {
            nome,
            valor_meta,
            valor_atual,
            data_limite
        } = req.body

        const id_usuario = req.user?.id || req.user?.id_usuario

        if (!id_usuario) {
            return res.status(401).json({
                message: 'Usuário não autenticado ou token inválido!'
            })
        }

        const objetivo = await Objetivo.findOne({
            where: {
                id_objetivo: id,
                id_usuario: id_usuario
            }
        })

        if (!objetivo) {
            return res.status(404).json({
                message: 'Objetivo não encontrado!'
            })
        }

        if (nome !== undefined) {
            if (!nome) {
                return res.status(400).json({
                    message: 'O nome não pode ser vazio!'
                })
            }

            objetivo.nome = nome
        }

        if (valor_meta !== undefined) {
            if (valor_meta === null || valor_meta === '') {
                return res.status(400).json({
                    message: 'O valor da meta não pode ser vazio!'
                })
            }

            if (isNaN(valor_meta)) {
                return res.status(400).json({
                    message: 'O valor da meta deve ser numérico!'
                })
            }

            objetivo.valor_meta = valor_meta
        }

        if (valor_atual !== undefined) {
            if (valor_atual === null || valor_atual === '') {
                return res.status(400).json({
                    message: 'O valor atual não pode ser vazio!'
                })
            }

            if (isNaN(valor_atual)) {
                return res.status(400).json({
                    message: 'O valor atual deve ser numérico!'
                })
            }

            objetivo.valor_atual = valor_atual
        }

        if (data_limite !== undefined) {
            if (data_limite === null || data_limite === '') {
                objetivo.data_limite = null
            } else {
                const dataRegex = /^\d{4}-\d{2}-\d{2}$/

                if (!dataRegex.test(data_limite)) {
                    return res.status(400).json({
                        message: 'A data limite deve estar no formato YYYY-MM-DD!'
                    })
                }

                objetivo.data_limite = data_limite
            }
        }

        await objetivo.save()

        return res.status(200).json({
            message: 'Objetivo editado com sucesso!',
            objetivo
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao editar objetivo',
            error: error.message
        })
    }
}
    /* deletar o objeto */
    static async deleteObjetivo(req, res) {
        try {
            const { id } = req.params

            const id_usuario = req.user?.id || req.user?.id_usuario

            const objetivo = await Objetivo.findOne({
            where: {
                id_objetivo: id,
                id_usuario: id_usuario
            }
        })

        if (!objetivo) {
            return res.status(404).json({
                message: 'Objetivo não encontrado!'
            })
        }

        await objetivo.destroy()

        return res.status(200).json({
            message: 'Objetivo deletado com sucesso!'
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao deletar objetivo',
            error: error.message
        })
    }
}

/* adicionar valor ao objetivo */
    static async addValorObjetivo(req, res) {   /* parte de simular valor */
        try {
            const { id } = req.params
            const { valor } = req.body

            const id_usuario = req.user?.id || req.user?.id_usuario

        if (!id_usuario) {
            return res.status(401).json({
                message: 'Usuário não autenticado ou token inválido!'
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

        const objetivo = await Objetivo.findOne({
            where: {
                id_objetivo: id,
                id_usuario: id_usuario
            }
        })

        if (!objetivo) {
            return res.status(404).json({
                message: 'Objetivo não encontrado!'
            })
        }

        /* adiciona um valor ao objetivo, cada vez que o usuário inserir o valor ele é acumulado no valor final */
        objetivo.valor_atual = Number(objetivo.valor_atual) + Number(valor) 

        await objetivo.save()

        return res.status(200).json({
            message: 'Valor adicionado com sucesso!',
            objetivo
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao adicionar valor',
            error: error.message
        })
    }
}
}