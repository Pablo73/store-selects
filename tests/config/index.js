require('dotenv/config');

const mySqlImportConfig = {
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const sequelizeConfig = [
  process.env.DB_DATABASE,
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
   {
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  },
];

module.exports = {
  mySqlImportConfig,
  sequelizeConfig,
};