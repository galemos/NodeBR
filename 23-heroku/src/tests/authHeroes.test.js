const assert = require('assert');
const api = require('./../api');
const ContextStrategy = require('./../db/strategies/base/contextStrategy');
const PostgresSQL = require('./../db/strategies/postgres/postgres');
const UserSchema = require('./../db/strategies/postgres/schemas/userSchema');

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhYmxlbW9zIiwiaWQiOjEsImlhdCI6MTU1MjU4MDU5NH0.JeYUvjkPWivVU0gn3a5Dm-Y1bRjcl8bVb_5HaZbRkSs";

let app= {};

const USER = {
    username: 'gablemos',
    password: '123'
};

const USER_BASE ={
    ...USER,
    password: '$2b$04$3/Z91SCJfVbFNOa3AdYyYur6b0moiea232y5.DgR7M6UY0CGZOI9e'
};

describe('Auth teste suit', function (){
    this.beforeAll(async () =>{
       app = await api;
       const connectionPostgres = await PostgresSQL.connect();
       const model = await PostgresSQL.defineModel(connectionPostgres, UserSchema);
       const context = new ContextStrategy(new PostgresSQL(connectionPostgres, model));
       await context.update(null, USER_BASE, true);
    });

    it('Deve obter um token', async ()=>{
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        });
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        assert.deepStrictEqual(statusCode, 200);
        assert.ok(dados.token.length > 10);
    });

    it('deve retornar não autorizado ao tentar obter um login errado', async () =>{
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'desconhecido',
                password: '123'
            }
        });
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        assert.deepStrictEqual(statusCode, 401);
        assert.deepStrictEqual(dados.error, 'Unauthorized')

    });
});