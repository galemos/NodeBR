const {deepEqual,ok} = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Energy Ring',
    id: 2
}

describe('Suite de manipulação de heroi', () => {
    before(async () =>{
        await database.remover()
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })

    it('Pesquisar herói', async () =>{
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)
        deepEqual(resultado, expected)
    })

    it('Cadastrar herói', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [atual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(atual,expected)
    })

    it('Deleta Herói', async () =>{
        const expected = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected)
    })

    it('Atualiza Herói', async () =>{
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Tecnology'
        }
        const novoDado = {
            nome: 'Batman',
            poder: 'Tecnology'
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado]= await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        console.log('resultado', resultado)
        deepEqual(resultado, expected)
    })

});