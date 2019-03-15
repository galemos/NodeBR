//npm i hapi
//npm i boom
//npm i vision inert hapi-swagger
//npm i hapi-auth-jwt2
//npm i dotenv
const dev = require('./config/.env.dev')
const {config} = require('dotenv');
const {join} = require('path');
const {ok} = require('assert');

const env = process.env.NODE_ENV || "dev";
ok(env === 'prod' || env === 'dev', 'a env é invalida, ou dev ou prod');

const configPath = join(__dirname, './config', `.env.${env}`);
config({
    path: configPath
});

const Hapi = require('hapi');
const HappiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');
const HapiJWT = require('hapi-auth-jwt2');

const Context = require('./db/strategies/base/contextStrategy');
const MongoDB = require('./db/strategies/mongodb/mongodb');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const PostgresSQL = require('./db/strategies/postgres/postgres');
const UserSchema = require('./db/strategies/postgres/schemas/userSchema');

const HeroRoute = require('./routes/heroRoutes');
const AuthRoute = require('./routes/authRoutes');

const JWT_SECRET = process.env.JWT_KEY;

const app = new Hapi.Server({
    port: process.env.PORT
});

function mapRoutes(instance, methods){
    return methods.map(method => instance[method]());
}

async function main() {
    const connection = MongoDB.connect();
    const context = new Context(new MongoDB(connection, HeroiSchema));

    const connectionPostgres = await PostgresSQL.connect();
    const modelUser = await PostgresSQL.defineModel(connectionPostgres, UserSchema);
    const contextPostgres = new Context(new PostgresSQL(connectionPostgres, modelUser));

    const swaggerOptions = {
        info: {
            title: 'API herois - #CursoNodeBR',
            version: 'v1.0'
        },
        lang: 'pt'
    };

    await app.register([
        HapiJWT,
        Vision,
        Inert,
        {
            plugin: HappiSwagger,
            options: swaggerOptions
        }
    ]);

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     experiesIn: 20
        // }
        validate: async (dado, request) =>{
            const [result] = await contextPostgres.read({
                username: dado.username
            });
            if(!result){
                return {isValid: false}
            }
            //verifica no banco se usuario continua ativo
            //verifica no banco se usuario continua pagando
            return {
                isValid: true // caso noValid = false
            }
        }
    });

    app.auth.default('jwt');

    app.route([
        //REST SPREAD
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET, contextPostgres), AuthRoute.methods())
    ]);

    await app.start();
    console.log('Servidor rodando na porta: ', app.info.port);

    return app;
}

module.exports = main();