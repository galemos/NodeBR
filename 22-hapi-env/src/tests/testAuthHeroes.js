const assert = require('assert');
const api = require('./../api');
const ContextStrategy = require('./../db/strategies/base/contextStrategy');
const PostgresSQL = require('./../db/strategies/postgres/postgres');
const UserSchema = require('./../db/strategies/postgres/schemas/userSchema');

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
        const { MONGO_USER, MONGO_PWD, MONGO_HOST, MONGO_PORT, MONGO_DB, MONGO_URL } = process.env;
        console.log(`mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
        console.log(typeof MONGO_URL)

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