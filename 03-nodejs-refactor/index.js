/*
    0 - Obter um usuáario
    1 - Obter o numero de telefone de um usuario a partir de seu ID
    2 - Obter o endereco do usuario pelo id
*/
// importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco());

function obterUsuario(){
    // quando der algum problema -> reject(ERRO)
    // quando for sucesso -> resolve(SUCESS)
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function(){
            // return reject(new Error('Erro manipulado via Reject'))

            return resolve({
                id: 1,
                nome: 'Gabriel',
                dataNascimento: new Date()
            })
        }, 1000);
    })
}

function obterTelefone(idUsuario){
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                numero: '2345-678',
                ddd: 11
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000);
}

const usuarioPromise = obterUsuario();
// para manipular com sucesso usamos a função .then
// para manipular com erro usamos a função .catch
// usuario -> telefone -> telefone
usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result) {
            return{
                usuario:{
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco;
    })
    .then(function (resultado) {
        console.log('Resultado: ', resultado)
    })
    .catch(function (error) {
        console.error('ERRO: ', error)
    })

