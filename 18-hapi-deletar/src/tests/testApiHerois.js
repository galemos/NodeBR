const assert = require('assert');
const api = require('./../api');

const MOCK_CADASTRAR = {
    nome: 'Charmander',
    poder: 'Fire'
};
const MOCK_BASE = {
    nome: 'Squirtle',
    poder: 'Water'
};
let MOCK_ID = '';

let app = {};
describe('Suite de testes da API Herois', function () {
    this.beforeAll(async ()=>{
        app = await api;

        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: JSON.stringify(MOCK_BASE)
        });
        const dados = JSON.parse(result.payload);
        MOCK_ID = dados._id;
    });

    it('GET Listar /herois', async ()=>{
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    });

    it('GET Listar /herois - deve retornar apenas 3 registros', async ()=>{
        const TAMANHO_LIMITE = 3;
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(dados.length === TAMANHO_LIMITE);
    });

    it('GET Listar /herois - deve retornar erro ao passar limit errado', async ()=>{
        const TAMANHO_LIMITE = 'A';
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        });

        const errorResult = {
            "statusCode": 400,
            "error": "Bad Request",
            "message": "child \"limit\" fails because [\"limit\" must be a number]",
            "validation": {
                "source": "query", "keys": ["limit"]
            }
        };
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 400);
        assert.deepEqual(result.payload, JSON.stringify(errorResult));
    });

    it('GET Listar /herois - deve filtrar um item', async ()=>{
        const NOME = 'Oliver Queen'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=100&nome=${NOME}`
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(dados[0].nome === NOME);
    });

    it('POST cadastrar /herois', async ()=>{
        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: MOCK_CADASTRAR
        });

        const {message, _id} = JSON.parse(result.payload);
        const statusCode = result.statusCode;

        assert.ok(statusCode === 200);
        assert.notStrictEqual(_id, undefined);
        assert.deepEqual(message, 'Heroi cadastrado com sucesso');

    });

    it('PATCH atualizar - /herois/:id', async ()=>{
        const expected = {
            poder: 'Water Bomb'
        };

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${MOCK_ID}`,
            payload: JSON.stringify(expected)
        });

        const statusCode =  result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        assert.deepEqual(dados.message, 'Heroi Atualizado com Sucesso!')
    });

    it('PATCH atualizar - /herois/:id - não deve atualizar com id que não existe', async ()=>{
        const _id = `5c86df4bb7f1d9336cc0d562`;

        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Id não encontrado no banco'
        };

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify({poder: 'new power'})
        });

        const statusCode =  result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 412);
        assert.deepEqual(dados, expected);
    });

    it('PATCH atualizar - /herois/:id - não deve atualizar com id errado', async ()=>{
        const _id = `ID_ERRADO`;

        const expected = {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An internal server error occurred'
        };

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify({poder: 'new power'})
        });

        const statusCode =  result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 500);
        assert.deepEqual(dados, expected);
    });

    it('DELETE deletar - /herois/:id', async ()=>{
        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${MOCK_ID}`,
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        assert.deepStrictEqual(dados.message, 'Heroi Deletado com Sucesso!')
    });

    it('DELETE deletar - /herois/:id - não deve remover', async ()=>{
        const _id = `5c86df4bb7f1d9336cc0d562`;

        const expected = {
            statusCode: 412,
            error: 'Precondition Failed',
            message: 'Id não encontrado no banco'
        };

        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`,
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 412);
        assert.deepStrictEqual(dados, expected)
    });

    it('DELETE deletar - /herois/:id - não deve remover com id invalido', async ()=>{
        const _id = `ID_INVALIDO`;

        const expected = {
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An internal server error occurred'
        };

        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`,
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 500);
        assert.deepStrictEqual(dados, expected)
    });
});