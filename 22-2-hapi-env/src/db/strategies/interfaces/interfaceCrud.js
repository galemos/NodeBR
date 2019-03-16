class ICrud{

    connect(){
        throw new NotImplementedException();
    }

    defineModel(){
        throw new NotImplementedException();
    }

    isConnected(){
    }

    create(item){
        throw new NotImplementedException();
    }

    read(query, skip, limit){
        throw new NotImplementedException();
    }

    update(id, item, upsert){
        throw new NotImplementedException();
    }

    delete(id){
        throw new NotImplementedException();
    }
}

module.exports = ICrud;