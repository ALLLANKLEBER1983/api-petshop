const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const NaoEncontrado = require('../../erros/NãoEncontrado')


roteador.get('/', async (requisicao,resposta) => 
{
    const resultados = await TabelaFornecedor.listar()
    resposta.status(200)
    resposta.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async(requisicao,resposta) =>{
    try {
        const dadosRecebidos = requisicao.body;
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.status(201)
        resposta.send(
        JSON.stringify(fornecedor)
        )
        
    } catch (error) {
        resposta.status(400)
        resposta.send(
            JSON.stringify({
                mensagem: error.message
    
            })
        )
        
    }
})

roteador.get('/:idFornecedor',async (requisicao,resposta) =>{
   try {
    const id = requisicao.params.idFornecedor
    const fornecedor = new Fornecedor({id:id}) 
    await fornecedor.carregar()
    resposta.status(200)
    resposta.send(
        JSON.stringify(fornecedor)
    )
       
   } catch (error) {
       resposta.status(404)
       resposta.send(
           JSON.stringify({
               mensagem: error.message

           })
       )
   }
    
})

roteador.put('/:idFornecedor',async (requisicao,resposta,proximo) =>{
    try {
        const id = requisicao.params.idFornecedor
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos,{id:id})
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        resposta.status(204)
        resposta.end()
        
    } catch (error) {
        proximo(error)
    }
})

roteador.delete('/:idFornecedor', async(requisicao,resposta) => {
    
   try {
    const id = requisicao.params.idFornecedor
    const fornecedor = new Fornecedor({ id:id})
    await fornecedor.carregar()
    await fornecedor.remover()
    resposta.status(204)
    resposta.end()  
   } catch (error) {
        resposta.status(404)
        resposta.send(
            JSON.stringify({
                mensagem: error.message

        })
    )
       
   }
})

module.exports = roteador