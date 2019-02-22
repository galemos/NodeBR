const service = require('./service')

async function main() {
    try {
        const result = await service.obterPessoa('a')
        const names = []

        //ESTRUTURA FOR
        console.time('for')
        for (let i = 0; i<= result.results.length - 1; i++){
            const pessoa = result.results[i]
            names.push(pessoa.name)
        }
        console.timeEnd('for')

        //ESTRUTURA FORIN
        console.time('forin')
        for(let i in result.results){
            const pessoa = result.results[i]
            names.push(pessoa.name)
        }
        console.timeEnd('forin')

        //ESTRUTURA FOROFF
        console.time('foroff')
        for(pessoa of result.results){
            names.push(pessoa.name)
        }
        console.timeEnd('foroff')

        console.log(`names`, names)
    } catch (error) {
        console.error('erro interno', error)
    }
}

main()