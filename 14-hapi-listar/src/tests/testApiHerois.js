const assert = require('assert');
const api = require('./../api');

let app = {};
describe('Suite de testes da API Herois', function () {
    this.beforeAll(async ()=>{
        app = await api;
    });

    it('Listar /herois', async ()=>{
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    });

    it('Listar /herois - deve retornar apenas 10 registros', async ()=>{
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

    it('Listar /herois - deve retornar erro ao passar limit errado', async ()=>{
        const TAMANHO_LIMITE = 'A';
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        });

        assert.deepEqual(result.payload, 'Erro interno no server');
    });

    it('Listar /herois - deve filtrar um item', async ()=>{
        const NOME = 'Flash'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=100&nome=${NOME}`
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(dados[0].nome === NOME);
    });
});