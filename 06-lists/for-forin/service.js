const axios = require('axios')
const URL = 'https://swapi.co/api/people'

async function obterPessoa(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url)
    return response.data
}

// obterPessoa('r2')
//     .then(function (resultado) {
//         console.log('resultado', resultado)
//     })
//     .catch(function (error) {
//         console.error('Deu Erro => ', error)
//     })

module.exports = {
    obterPessoa
}
