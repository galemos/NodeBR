const assert = require('assert');
const api = require('./../api');
const context = require('./../db/strategies/base/contextStrategy');
const PostgresSQL = require('./../db/strategies/postgres/postgres');
const UserSchema = require('./../db/strategies/postgres/schemas/userSchema');

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhYmxlbW9zIiwiaWQiOjEsImlhdCI6MTU1MjU4MDU5NH0.JeYUvjkPWivVU0gn3a5Dm-Y1bRjcl8bVb_5HaZbRkSs";

let app= {};

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
        console.log(`${dados.token}\n`)
        assert.deepStrictEqual(statusCode, 200);
        assert.ok(dados.token.length > 10);
    });
});