const BaseRoutes = require('./base/baseRoutes');
const Joi = require('joi');
const Boom = require('boom');
const JWT = require('jsonwebtoken');
//npm i jsonwebtoken

const failAction = (request, headers, erro)=> { throw erro };

const USER = {
    username: 'gablemos',
    password: '123'
};

class AuthRoutes extends BaseRoutes {
    constructor(secret){
        super();
        this.secret = secret;
    }
    login(){
        return {
            path: '/login',
            method: 'post',
            config:{
                auth: false,
                tags: ['api'],
                description: 'Obter Token',
                notes: 'Faz login com user e senha do banco',
                validate:{
                    failAction,
                    payload:{
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request)=>{
                const {username, password} = request.payload;

                if(username.toLowerCase() !== USER.username || password !== USER.password){
                    return Boom.unauthorized('Usuário ou senha incorretos');
                }

                const token = JWT.sign({
                    username: username,
                    id: 1
                }, this.secret);
                return {token};

            }
        }
    }
}

module.exports = AuthRoutes;