const Mongoose = require('mongoose');

Mongoose.connect('mongodb://gablemos:roor@192.168.99.100:27017/herois',
    {useNewUrlParser: true}, function (error) {
        if(error){
            console.log('Falha na conexão', error)
        } else {
            return;
        }
    });

const connection = Mongoose.connection;


// function nomeFuncao(){
//
// }
//
// const minhaFuncao = function(){
//
// };
//
// const minhaFuncaoArrow = () =>{
//
// };
//
// const minhaFuncaoArrowSimples = (params) => console.log(params);

connection.once('open', () => console.log('Database Rodando'));
// setTimeout(() => {
//     const state = connection.readyState;
//     console.log('state', state)
// }, 1000);
/*
    0: Disconectado
    1: Conectado
    2: Conectando
    3: Disconectando
 */

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

const model = Mongoose.model('herois', heroiSchema);

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Pikashu',
        poder: 'Thunderbolt'
    });
    console.log('result cadastrar', resultCadastrar);

    const listItens = await model.find();

    console.log('itens', listItens)
}

main();