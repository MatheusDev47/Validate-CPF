//Função construtora 
function CPFValidate (cpf) {
    Object.defineProperty(this, 'cpf', {
        get : () => {
            //retorna um cpf sem os pontos e traço
            return cpf.replace(/\D+/g, '')
        }
    })
}

//métodos de CPFValidate adicionados no prototype do objeto cpf
//clearCPF - remove os dois números depois do traço e retorna o cpf sem eles
CPFValidate.prototype.clearCPF = function () {
    let cpf = this.cpf
    cpf = cpf.slice(0, 9)
    return cpf
}
//validate = responsável por fazer as validações do cpf
CPFValidate.prototype.validate = function () {
    const cpf = this.cpf
    const cpfClear = this.clearCPF()
    if(typeof cpf !== 'string') {
        console.log('Digite um tipo válido de CPF')
        return false
    }

    if(cpf.length !== 11) {
        console.log('O CPF precisa ter 11 caracteres')
        return false
    }

    if(cpf[0].repeat(11) === cpf) {
        console.log('Digite um CPF válido')
        return false
    }

    const digitOne = this.digits(cpfClear)
    const digitTwo = this.digits(cpfClear + digitOne)
    const cpfComplete = cpfClear + digitOne + digitTwo
    cpfComplete === cpf ? console.log('CPF Válido') : console.log('CPF Inválido')
}
//digits - responsável por gerar os dois digitos finais do cpf. 
CPFValidate.prototype.digits = function (cpf) {
    cpf = Array.from(cpf)
    let decrementor = cpf.length + 1
    const amount = cpf.reduce((acc, value) => {
        value = Number(value)
        acc += value *= decrementor
        decrementor--
        return acc
    }, 0)

    let digit = 11 - (amount % 11)
    if(digit > 9) digit = 0
    return digit
}

//Aqui é passado um cpf qualquer, desde que seja válido
const cpf = new CPFValidate('222.333.444-55')
cpf.validate()