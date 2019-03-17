//  docker ps
//  docker exec -it e1c2661fe13c mongo -u gablemos -p roor --authenticationDatabase herois

//databases
show dbs

//mudando contexto para uma database especifica
use herois

//mostrar coleções de documentos(tabelas)
show collections

//inserir
db.herois.insert({nome:'Flash', poder:'Velocidade', dataNascimento: '1991-01-01'});

//listar
db.herois.find();

//listar formatado
db.herois.find().pretty();

//comando js no mongo, laço de inserção
for (let i=0; i<10000;i++){
    db.herois.insert({
        nome:`Clone-${i}`,
        poder:'Velocidade',
        dataNascimento: '1991-01-01'
    });
}

//contar registros
db.herois.count();

//encontrar o primeiro registro
db.herois.findOne();

//listar apenas 10 registros, ordenaod pelo nome de ordem decrescente
db.herois.find().limit(10).sort({nome: -1});

// usar {} é igual um where 1=1
// coluna é um atributo do objeto
//listar de todos os registros, apenas a "coluna" poder em ordem crescente e forçar não trazer a "coluna" id
db.herois.find({}, {poder: 1, _id: 0});

//lista o objeto com atributo nome igual a flash
db.herois.find({nome:'Flash'});

//update de um objeto pelo id, mas este atualizará o objeto completo
db.herois.update({_id:ObjectId("5c81073a259db26033067bf8")},{nome: 'Mulher Maravilha'});

//update de um objeto pelo id, este atualizará apenas o atributo nome
db.herois.update({_id:ObjectId("5c810828259db26033067bf9")},{$set: {nome: 'Lanterna Verde'}});

//update de um objeto pelo id, este atualizará o objeto acrescentando o atributo name, pois o existente é nome.
//erro do nome do atributo resultará no acrescimo de um novo
db.herois.update({_id:ObjectId("5c810828259db26033067bf9")},{$set: {name: 'Lanterna Verde'}});

db.herois.remove({})

//-------------CRUD----------------------

//CREATE
db.herois.insert({
    nome:`Clone-${i}`,
    poder:'Velocidade',
    dataNascimento: '1991-01-01'
});

//READ
db.herois.find();

//UPDATE
db.herois.update({_id:ObjectId("5c810828259db26033067bf9")},{$set: {nome: 'Lanterna Verde'}});

//DELETE
db.herois.remove({nome:'Clone-1'});