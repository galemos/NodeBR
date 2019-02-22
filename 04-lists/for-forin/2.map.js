const service = require('./service')

Array.prototype.meuMap = function(callback){
    const novoArrayMapeado = []
    for(let indice = 0; indice <= this.length - 1; indice++) {
        const resultado = callback(this[indice], indice)
        novoArrayMapeado.push(resultado)
    }
    return novoArrayMapeado
}

async function main() {
    try {
        const results = await service.obterPessoa('a')

        //ESTRUTURA FOR EACH
        // const names = []
        // results.results.forEach(function (item) {
        //     names.push(item.name)
        // })

        //ESTRUTURA MAP
        // const names = results.results.map(function (pessoa) {
        //     return pessoa.name
        // })

        //ESTRUTURA MAP COM ARROW FUNCTION
        // const names = results.results.map(pessoa => pessoa.name)

        const names = results.results.meuMap(function (pessoa, indice){
            return `[${indice}]${pessoa.name}`;
        })

        console.log(`names`, names)
    }catch (e) {
        console.error('Deu erro', e)
    }
}

main()