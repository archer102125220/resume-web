'use strict';

const nodeEnv = process.env.NODE_ENV || 'development';

//https://github.com/sequelize/cli/issues/766

const envConfig = {
  dialect: process.env.DB_CONNECTION,
  host: process.env.POSTGRES_HOST,
  // host: process.env.POSTGRES_URL + '?sslmode=require',
  // port: parseInt(process.env.DB_PORT),

  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,

  operatorsAliases: false,
  define: {
    charset: process.env.DB_DEFINE_CHARSET,
    collate: process.env.DB_DEFINE_COLLATE
  },

  dialectOptions: {
    dialect: process.env.DB_CONNECTION,
    charset: process.env.DB_DIALECT_OPTIONS_CHARSET,
    collate: process.env.DB_DIALECT_OPTIONSE_COLLATE,
    instanceName: process.env.DB_SERVER_NAME,
    enableArithAbort: false,
    encrypt: true,
    ssl: true
  }
};

module.exports = {
  [nodeEnv]: envConfig
};
