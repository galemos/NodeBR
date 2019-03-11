// npm i pg-hstore pg sequelize

const Sequelize = require('sequelize');
const driver = new Sequelize(
    'heroes', //database
    'gablemos', //user
    'root', //password
    {
        host:'192.168.99.100', //ip host
        dialect: 'postgres', //tipo de dialeto da base de dados
        quoteIdentifiers: false, //
        operatorsAliases: false //desabilita deprecated
    }
);

async function main() {
    const Herois = driver.define('herois',{
        //Colunas e definições das colunas
        ID:{
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        NAME:{
            type: Sequelize.STRING,
            required: true,
        },
        POWER:{
            type: Sequelize.STRING,
            required: true,
        }
    }, {
        tableName: 'TB_HEROES', //nome da tablea
        freezeTableName: false,
        timestamps: false
    });
    await Herois.sync();

    await Herois.create({
        NAME:'New Name',
        POWER: 'New Power'
    });

    const result = await Herois.findAll({raw: true, attributes:['NAME']});
    console.log('result', result)
}

main();