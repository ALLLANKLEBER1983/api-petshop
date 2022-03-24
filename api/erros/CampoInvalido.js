class CampoInvalido extends Error {
    constructor (campo) {
        const mensagem = `Ò campo '${campo}' está invalido`
        super(mensagem)
        this.name = 'CampoInvalido'
        this.idErro = 1
    }
}

module.exports = CampoInvalido