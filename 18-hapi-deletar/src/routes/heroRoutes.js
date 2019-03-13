const BaseRoutes = require('./base/baseRoutes');
const Joi = require('joi');
const Boom = require('boom');

const failAction = (request, headers, erro)=> { throw erro };

class HeroRoutes extends BaseRoutes {
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config:{
                validate:{
                    //payload -> body da requisição
                    //header -> cabeçalho, o que passa para autenticar
                    //params -> na url :id
                    //query -> ?skip=0&limit=10&nome=Flash

                    failAction,
                    query:{
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, heads) => {
                try {
                    const { skip, limit, nome } = request.query;

                    const query = nome ? {
                        nome: {
                            $regex:`.*${nome}*.`
                        }
                    } : {};

                    return this.db.read(nome?query:{}, skip, limit);
                } catch (error) {
                    console.error('You have a new error: ', error);
                    return Boom.internal();
                }
            }
        }
    }

    create(){
        return {
            path: '/herois',
            method: 'POST',
            config:{
                validate:{
                    failAction,
                    payload:{
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    }
                }
            },
            handler: async (request) =>{
                try {
                    const {nome, poder} = request.payload;
                    const result = await this.db.create({nome,poder});
                    return{
                        message: 'Heroi cadastrado com sucesso',
                        _id: result._id
                    }
                }catch (error) {
                    console.log('Error', error);
                    return Boom.internal();
                }
            }
        }
    }

    update(){
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                validate:{
                    failAction,
                    params:{
                        id: Joi.string().required()
                    },
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(100)
                    }
                }
            },
            handler: async (request) =>{
                try {
                    const {id} = request.params;

                    const {payload} = request;

                    const dadosString = JSON.stringify(payload);

                    const dados = JSON.parse(dadosString);

                    const result = await this.db.update(id, dados);
                    if(result.nModified !== 1)
                        return  Boom.preconditionFailed('Id não encontrado no banco');

                    return {message:'Heroi Atualizado com Sucesso!'};
                }catch (error) {
                    console.error('Error', error);
                    return Boom.internal();
                }
            }
        }
    }

    delete(){
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                validate:{
                    failAction,
                    params:{
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (request) =>{
                try {
                    const {id} = request.params;

                    const result = await this.db.delete(id);
                    if(result.n !== 1)
                        return  Boom.preconditionFailed('Id não encontrado no banco');

                    return {message:'Heroi Deletado com Sucesso!'};
                }catch (error) {
                    console.error('Error', error);
                    return Boom.internal();
                }
            }
        }
    }
}

module.exports = HeroRoutes;