const {
    readFile,
    writeFile
} = require('fs')

const {
    promisify
} = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

//outra forma de obter dados do json
// const dadosJson = require('./herois.json')

class Database{
    constructor(){
        this.NOME_ARQUIVO = '06-cli\\herois.json'
    }

    async obterDadosArquivo(){
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados){
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async cadastrar(heroi){
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <= 2 ? heroi.id : Date.now()
        /*
            {nome: 'flash',poder: 'velocidade} concatenar com { id: 1593578462}

            {
                nome: 'flash',
                poder: 'velocidade'
                id: 1593578462
            }
         */
        const heroiComId ={
            id,
            ...heroi
        }

        const dadosFinal = [...dados, heroiComId]
        return await this.escreverArquivo(dadosFinal)
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo()
        return dados.filter(item =>(id ? (item.id === id) : true))
    }

    async remover(id){
        if(!id){
            return this.escreverArquivo([])
        }

        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if(indice === -1){
            throw Error('O heroi informado não existe')
        }
        dados.splice(indice, 1)
        return await this.escreverArquivo(dados)

        return false
    }
}

module.exports = new Database()