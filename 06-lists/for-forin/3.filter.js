const {
    obterPessoa
} = require('./service')

/*
    {
        Nome: Gabriel,
        Idade: 27
    }
    const { nome } = item
    console.log(nome)
*/

Array.prototype.meuFilter = function(callback){
    const lista = []
    for(index in this){
        const item = this[index]
        const result = callback(item, index, this)
        //0, "", null, undefined === false
        if(!result) continue;
        lista.push(item)
    }
    return lista
}

async function main() {
    try {
        const {
            results
        } = await obterPessoa('a')

        // const familiaLars = results.filter(function (item) {
        //     // por padrão precisa retornar um booleano
        //     // para informar se deve manter da lista
        //     // false > remove da lista
        //     // true > mantem
        //     // não encontrou = -1
        //     // encontrou = posicaoNoArray
        //     const result = item.name.toLowerCase().indexOf(`lars`) != -1
        //     return result
        // })
        const familiaLars = results.meuFilter((item, index, lista) => {
            console.log(`index: ${index}`, lista.length)
            return item.name.toLowerCase().indexOf('lars') != -1
        })

        const names = familiaLars.map(pessoa => pessoa.name)
        console.log(names)
    } catch (error) {
        console.error('Deu erro:', error)
    }
}

main()
