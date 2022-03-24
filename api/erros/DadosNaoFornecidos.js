class DadosNaoFornecidos extends Error {
    constructor(){
        super('Não foram fornecidos dados para atualizar')
        this.name = 'DadosNaoFornecidos'
    }
}

module.exports = DadosNaoFornecidos