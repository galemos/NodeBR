const ICrud = require('./interfaces/interfaceCrud');
const Mongoose = require('mongoose');
const STATUS ={
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
};

class MongoDB extends ICrud{
    constructor(){
        super();
        this._herois = null;
        this._driver = null;
    }

    connect(){
        Mongoose.connect('mongodb://gablemos:roor@192.168.99.100:27017/herois',
            {useNewUrlParser: true}, function (error) {
                if(error){
                    console.log('Falha na conexão', error)
                } else {
                    return;
                }
            });

        const connection = Mongoose.connection;
        connection.once('open', () => console.log('Database Rodando'));

        this._driver = connection;

        this.defineModel();
    }

    defineModel() {
        const heroiSchema = new Mongoose.Schema({
            nome:{
                type: String,
                required: true
            },
            poder:{
                type: String,
                required: true
            },
            insertedAt:{
                type: Date,
                default: new Date()
            }
        });

        this._herois = Mongoose.model('herois', heroiSchema);
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState];

        if(state === 'Conectado') return state;

        if (state !== 'Conectando') return state;

        await new Promise(resolve => setTimeout(resolve, 1000));

        return STATUS[this._driver.readyState];
    }

    create(item) {
        return this._herois.create(item);
    }

    read(query, skip = 0, limit = 10) {
        return this._herois.find(query).skip(skip).limit(limit);
    }

    update(id, item) {
        return this._herois.updateOne({_id: id}, {$set:item})
    }

    delete(id) {
        return this._herois.deleteOne({_id: id});
    }
}

module.exports = MongoDB;