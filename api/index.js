const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NãoEncontrado')

app.use(bodyParser.json())

const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores',roteador)

app.use((error,requisicao,resposta,proximo) =>{
    if(error instanceof NaoEncontrado){
        resposta.status(404)
    }else{
        resposta.status(400)
    }
    resposta.send(
        JSON.stringify({
            mensagem: error.message,
            id: error.idErro

        })
    )
})

app.listen(config.get('api.porta'),() => console.log("A API está funcionado!"));