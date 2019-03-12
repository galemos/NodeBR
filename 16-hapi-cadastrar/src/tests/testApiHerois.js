const assert = require('assert');
const api = require('./../api');

const MOCK_CADASTRAR = {
    nome: 'Charmander',
    poder: 'Fire'
};
let app = {};

describe('Suite de testes da API Herois', function () {
    this.beforeAll(async ()=>{
        app = await api;
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

});