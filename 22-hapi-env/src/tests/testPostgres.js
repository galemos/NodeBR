const { equal, deepEqual, ok } = require('assert');
const ContextStrategy = require('./../db/strategies/base/contextStrategy');
const PostgresSQL = require('./../db/strategies/postgres/postgres');
const HeroiSchema = require('./../db/strategies/postgres/schemas/heroisSchema');

const MOCK_HEROI_CADASTRAR = {
    name:'New Name Create',
    power: 'New Power Create'
};

const MOCK_HEROI_ATUALIZAR = {
    name:'New Name Update',
    power: 'New Power Update'
};

let context = {};

describe('Postgress CRUD tests', function () {
    this.timeout(Infinity);

    this.beforeAll(async function () {
        console.log(process.env.PORT);
        const connectionPostgres = await PostgresSQL.connect();
        const model = await PostgresSQL.defineModel(connectionPostgres, HeroiSchema);
        const context = new ContextStrategy(new PostgresSQL(connectionPostgres, model));

        await context.delete();
        await context.create(MOCK_HEROI_CADASTRAR);
        await context.create(MOCK_HEROI_ATUALIZAR);
    });

    it('Connection', async function (){
        const result = await context.isConnected();
        equal(result, true);
    });

    it('Cadastrar', async function (){
        const result = await context.create(MOCK_HEROI_CADASTRAR);
        delete result.id;
        deepEqual(result, MOCK_HEROI_CADASTRAR);
    });

    it('Listar', async function () {
        const [result] = await context.read({name: MOCK_HEROI_CADASTRAR.name});
        delete result.id;
        deepEqual(result, MOCK_HEROI_CADASTRAR);
    });

    it('Atualizar', async function() {
        const [itemAtualizar] = await context.read({name: MOCK_HEROI_ATUALIZAR.name});
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            name: 'Update Name Update'
        };
        const [result] = await context.update(itemAtualizar.id, novoItem);
        deepEqual(result, 1);

        const [itemAtualizado] = await context.read({id:itemAtualizar.id});
        deepEqual(itemAtualizado.nome, novoItem.nome);
    });

    it('Remover por Id', async function () {
        const [item] = await context.read({});
        const result = await context.delete(item.id);
        deepEqual(result, 1);
    });
});