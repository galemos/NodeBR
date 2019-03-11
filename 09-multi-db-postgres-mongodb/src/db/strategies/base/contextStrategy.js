const ICrud = require('./../interfaces/interfaceCrud');

class ContextStrategy extends ICrud{
    constructor(strategy){
        super();
        this._database = strategy;
    }

    connect(){
        return this._database.connect();
    }

    defineModel(){
        return this._database.defineModel();
    }

    isConnected() {
        return this._database.isConnected();
    }

    create(item){
        return this._database.create(item);
    }

    read(query, skip, limit) {
        return this._database.read(query, skip, limit);
    }

    update(id, item){
        return this._database.update(id, item);
    }

    delete(id){
        return this._database.delete(id);
    }
}

module.exports = ContextStrategy;