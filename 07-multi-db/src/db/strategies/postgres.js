const ICrud = require('./interfaces/interfaceCrud')

class Postgres extends ICrud{
    constructor(){
        super();
    }
    create(item){
        console.log('O item foi salvo em Postgres');
    }

    read(query){
        console.log('O item foi lido em Postgres');
    }

    update(id, item){
        console.log('O item foi atualizado em Postgres');
    }

    delete(id){
        console.log('O item foi deletado em Postgres');
    }
}

module.exports = Postgres;