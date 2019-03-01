const ICrud = require('./interfaces/interfaceCrud')

class MongoDB extends ICrud{
    constructor(){
        super();
    }
    create(item){
        console.log('O item foi salvo em MongoDB');
    }

    read(query){
        console.log('O item foi listado em MongoDB');
    }

    update(id, item){
        console.log('O item foi atualizado em MongoDB');
    }

    delete(id){
        console.log('O item foi deletado em MongoDB');
    }
}

module.exports = MongoDB;