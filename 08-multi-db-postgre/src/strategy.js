class NotImplementedExcept extends Error {
    constructor(){
        super('Not Implemented Exception');
    }
}

class ICrud{
    create(item){
        throw new NotImplementedExcept();
    }

    read(query){
        throw new NotImplementedExcept();
    }

    update(id){
        throw new NotImplementedExcept();
    }

    delete(id){
        throw new NotImplementedExcept();
    }
}

class MongoDB extends ICrud{
    constructor(){
        super();
    }
    create(item){
        console.log('O item foi salvo em MongoDB');
    }

    read(item){
        console.log('O item foi listado em MongoDB');
    }

    update(id, item){
        console.log('O item foi atualizado em MongoDB');
    }

    delete(id){
        console.log('O item foi deletado em MongoDB');
    }
}

class Postgres extends ICrud{
    constructor(){
        super();
    }
    create(item){
        console.log('O item foi salvo em Postgres');
    }

    read(item){
        console.log('O item foi lido em Postgres');
    }

    update(id, item){
        console.log('O item foi atualizado em Postgres');
    }

    delete(id){
        console.log('O item foi deletado em Postgres');
    }
}

class ContextStrategy{
    constructor(strategy){
        this._database = strategy;
    }

    create(item){
        return this._database.create();
    }

    read(item){
        return this._database.read(item);
    }

    update(id, item){
        return this._database.update(id, item);
    }

    delete(id){
        return this._database.delete(id);
    }
}