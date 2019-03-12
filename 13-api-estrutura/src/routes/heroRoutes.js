const BaseRoutes = require('./base/baseRoutes');

class HeroRoutes extends BaseRoutes{
    constructor(db){
        super();
        this.db = db;
    }

    list(){
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, heads) =>{
                return this.db.read();
            }
        }
    }
}

module.exports = HeroRoutes;