class ICrud{

    isConnected(){
        throw new NotImplementedException();
    }

    create(item){
        throw new NotImplementedException();
    }

    read(query){
        throw new NotImplementedException();
    }

    update(id){
        throw new NotImplementedException();
    }

    delete(id){
        throw new NotImplementedException();
    }
}

module.exports = ICrud;