//npm i jsonwebtoken
const BaseRoutes = require('./base/baseRoutes');
const Joi = require('joi');
const Boom = require('boom');
const JWT = require('jsonwebtoken');
const PasswordHelper = require('./../helpers/passwordHelper');
const failAction = (request, headers, erro)=> { throw erro };

const USER = {
    username: 'gablemos',
    password: '123'
};

class AuthRoutes extends BaseRoutes {
    constructor(secret, db){
        super();
        this.secret = secret;
        this.db = db;
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
                const [usuario]= await this.db.read({username: username.toLowerCase()});
                if(!usuario){
                    return Boom.unauthorized('Usuario ou senha incorretos');
                }
                const match = PasswordHelper.comparePassword(password, username.password);
                if(!match){
                    return Boom.unauthorized('Usuario ou senha incorretos');
                }
                // if(username.toLowerCase() !== USER.username || password !== USER.password){
                //     return Boom.unauthorized('Usuário ou senha incorretos');
                // }

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