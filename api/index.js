const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NãoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

app.use(bodyParser.json())

const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores',roteador)

app.use((error,requisicao,resposta,proximo) =>{
    let status = 500

    if(error instanceof NaoEncontrado){
        status = 404
    }
    if(error instanceof CampoInvalido || error instanceof DadosNaoFornecidos ){
        status = 400
    }
    if(error instanceof ValorNaoSuportado){
        status = 406
    }
    resposta.status(status)
    resposta.send(
        JSON.stringify({
            mensagem: error.message,
            id: error.idErro

        })
    )
})

app.listen(config.get('api.porta'),() => console.log("A API está funcionado!"));