const { equal, deepEqual, ok} = require('assert');
const Context = require('./../db/strategies/base/contextStrategy');
const MongoDB = require('./../db/strategies/mongodb');

const context = new Context(new MongoDB());

const MOCK_HEROI_CADASTRAR = {
    nome:'Oliver Queen',
    poder: 'Arrow'
};

const MOCK_HEROI_DEFAULT = {
    nome:`Super Gêmeos-${Date.now()}`,
    poder: 'Transform'
};

const MOCK_HEROI_ATUALIZAR = {
    nome:`Charlie-${Date.now()}`,
    poder: 'Writer'
};

let MOCK_HEROI_ID = '';

describe('MongoDB CRUD tests', function () {

    this.beforeAll(async ()=>{
        await context.connect();
        await context.create(MOCK_HEROI_DEFAULT);
        const result = await context.create(MOCK_HEROI_ATUALIZAR);
        MOCK_HEROI_ID = result.id;
    });

    it('Connection', async ()=>{
        const result = await context.isConnected();
        const expected = 'Conectado';
        deepEqual(result, expected);
    });

    it('Cadastrar', async ()=>{
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR);
        deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR);
    });

    it('Listar', async ()=>{
        const [{nome, poder}] = await context.read({nome: MOCK_HEROI_DEFAULT.nome});
        deepEqual({nome, poder}, MOCK_HEROI_DEFAULT);
    });

    it('Atualizar', async ()=>{
        const result = await context.update(MOCK_HEROI_ID, {nome: 'Donlea'});
        deepEqual(result.nModified, 1);
    });

    it('Remover', async ()=>{
        const result = await context.delete(MOCK_HEROI_ID);
        deepEqual(result.n, 1);
    });
});