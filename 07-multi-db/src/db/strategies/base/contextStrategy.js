const ICrud = require('./../interfaces/interfaceCrud');

class ContextStrategy extends ICrud{
    constructor(strategy){
        super();
        this._database = strategy;
    }

    isConnected() {
        return this._database.isConnected();
    }

    create(item){
        return this._database.create();
    }

    read(query) {
        return this._database.read(query);
    }

    update(id, item){
        return this._database.update(id, item);
    }

    delete(id){
        return this._database.delete(id);
    }
}

module.exports = ContextStrategy;