const BaseRoutes = require('./base/baseRoutes');

class HeroRoutes extends BaseRoutes {
    constructor(db) {
        super();
        this.db = db;
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, heads) => {
                try {
                    const { skip, limit, nome } = request.query;

                    let query = {};
                    if(nome){
                        query.nome = nome;
                    }

                    if(isNaN(skip)){
                        throw Error('Wrong type of skip');
                    }

                    if(isNaN(limit)){
                        throw Error('Wrong type of limit');
                    }

                    return this.db.read( query, parseInt(skip), parseInt(limit));
                } catch (error) {
                    console.error('You have a new error: ', error);
                    return 'Erro interno no server';
                }
            }
        }
    }
}

module.exports = HeroRoutes;