const jwt = require('jsonwebtoken')

module.exports = function checkToken( req, res, next) { // next manda/permite a funcao prosseguir se a autenticacao for validada

    const authHeader = req.headers['authorization']

    if(!authHeader)
    {
        return res.status(401).json({message: 'Acesso negado! Token não fornecido.'}) // se usuario nao estiver autenticado
    }

    const token = authHeader.split(' ')[1] // pegar somente a informacao necessario do token

    try 
    {
        const decoded = jwt.verify(token,process.env.JWT_SECRET) // verifica se esta tudo certo com p token, senao token invalido!

        req.user = decoded  // coloca os dados do token dentro do usuario

        next() // libera a rota prosseguir
        
    } catch (error) {

        return res.status(401).json({message: 'Token inválido!'})
    }


}