const ContextStrategy = require('./db/strategies/base/contextStrategy');
const MongoDB = require('./db/strategies/mongodb/mongodb');
const Postgres = require('./db/strategies/postgres');

const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();

const contextPostegres = new ContextStrategy(new Postgres());
contextPostegres.create();