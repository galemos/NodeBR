const ICrud = require('./interfaces/interfaceCrud');
const Sequelize = require('sequelize');

class Postgres extends ICrud{
    constructor(){
        super();
        this._driver = null;
        this._herois = null;
        this._connect();
    }

    _connect(){
        this._driver = new Sequelize(
            'heroes', //database
            'gablemos', //user
            'root', //password
            {
                host:'192.168.99.100', //ip host
                dialect: 'postgres', //tipo de dialeto da base de dados
                quoteIdentifiers: false, //desabilita case sensitive
                operatorsAliases: false //desabilita deprecated
            }
        );
        this.defineModel();
    }

    async defineModel(){
        this._herois = this._driver.define('heroes',{
            //Colunas e definições das colunas
            id:{
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            name:{
                type: Sequelize.STRING,
                required: true,
            },
            power:{
                type: Sequelize.STRING,
                required: true,
            },
        }, {
            tableName: 'TB_HEROES', //nome da tablea
            freezeTableName: false,
            timestamps: false
        });
    }

    async isConnected(){
        try {
            await this._driver.authenticate();
            return true;
        }catch (error) {
            console.error('Impossible to connect'. error);
            return false;
        }
    }

    async create(item){
        const {dataValues} = await this._herois.create(item);
        return dataValues;
    }

    read(item = {}){
        return this._herois.findAll({where: item, raw: true});
    }

    async update(id, item){
        return this._herois.update(item, {where: {id: id}});
    }

    async delete(id){
        const query = id? {id} : {};
        return this._herois.destroy({where: query});
    }
}

module.exports = Postgres;