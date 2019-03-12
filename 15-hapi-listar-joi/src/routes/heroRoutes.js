const BaseRoutes = require('./base/baseRoutes');
const Joi = require('joi');

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

                    failAction:(request, headers, erro)=> {
                        throw erro
                    },
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
                    return 'Erro interno no server';
                }
            }
        }
    }

}

module.exports = HeroRoutes;