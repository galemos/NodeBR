const ICrud = require('../interfaces/interfaceCrud');
const Mongoose = require('mongoose');
const { MONGO_USER, MONGO_PWD, MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;
const STATUS ={
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
};

class MongoDB extends ICrud{
    constructor(connection, schema){
        super();
        this._schema = schema;
        this._connection = connection;
    }

    static connect(){
        Mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`,
            {useNewUrlParser: true}, function (error) {
                if(error){
                    console.log('Falha na conexão', error)
                } else {
                    return;
                }
            });

        const connection = Mongoose.connection;
        connection.once('open', () => console.log('Database Rodando'));
        return connection;
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState];

        if(state === 'Conectado') return state;

        if (state !== 'Conectando') return state;

        await new Promise(resolve => setTimeout(resolve, 1000));

        return STATUS[this._connection.readyState];
    }

    create(item) {
        return this._schema.create(item);
    }

    read(query, skip = 0, limit = 10) {
        return this._schema.find(query).skip(skip).limit(limit);
    }

    update(id, item) {
        return this._schema.updateOne({_id: id}, {$set:item})
    }

    delete(id) {
        return this._schema.deleteOne({_id: id});
    }
}

module.exports = MongoDB;