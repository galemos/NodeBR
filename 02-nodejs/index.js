/*
    0 - Obter um usuáario
    1 - Obter o numero de telefone de um usuario a partir de seu ID
    2 - Obter o endereco do usuario pelo id
*/

function obterUsuario(callback){
    setTimeout(function(){
        return callback(null,{
            id: 1,
            nome: 'Gabriel',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            telefone: '2345-678',
            ddd: 11
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000);
}

function resolverUsuario(erro, usuario){
    console.log('usuario', usuario);
}

obterUsuario(function resolverUsuario(erro, usuario){
    // null || "" || 0 === false
    if(erro){
        console.erro('Problema com usuário', erro);
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(erro1, telefone){
        if(erro1){
            console.erro('Problema com telefone', erro);
            return;
        }  
        obterEndereco(usuario.id, function resolverEndereco(erro2, endereco){
            if(erro2){
                console.erro('Problema com telefone', erro);
                return;
            }

            console.log(`
                Nome: ${usuario.nome},
                Endereco:${endereco.rua}, ${endereco.numero},
                Telefone:(${telefone.ddd})${telefone.numero}
            `);
        });
    });

});
// const telefone = obterTelefone(usuario.id);
// console.log('telefone', telefone);