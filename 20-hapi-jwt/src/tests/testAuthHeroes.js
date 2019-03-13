const assert = require('assert');
const api = require('./../api');

let app= {};

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhYmxlbW9zIiwiaWQiOjEsImlhdCI6MTU1MjQ5NDMwOH0.uT8BI3PMBHuoh6E503Ab1y2JRkmCzFpCe7pMWL7GnZ4";

describe('Auth teste suit', function (){
    this.beforeAll(async () =>{
       app = await api;
    });

    it('Deve obter um token', async ()=>{
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload:{
                username: 'gablemos',
                password: '123'
            }
        });

        const statusCode = result.statusCode;

        const dados = JSON.parse(result.payload);

        assert.deepStrictEqual(statusCode, 200);
        assert.ok(dados.token.length > 10);
    });
});