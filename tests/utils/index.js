const { readFile } = require('fs/promises');
const path = require('path');
const { Sequelize } = require('sequelize');
const MysqlImport = require('mysql-import');
const { mySqlImportConfig, sequelizeConfig } = require('../config');

async function getUserQuery(numberChallenge) {
  return readFile(path
    .resolve(__dirname, '..', '..', 'src', `${numberChallenge}-challenge.sql`), 'utf-8');
}

async function getExpectedResult(numberChallenge) {
  return require(path
    .resolve(__dirname, '..', 'mocks', `${numberChallenge}-challengeResult.js`));
}

function getConnectionSequelize() {
  return new Sequelize(...sequelizeConfig);
}

async function executeMySqlImport() {
  const newMySqlImport = await new MysqlImport(mySqlImportConfig);

  await newMySqlImport.import(path.resolve(__dirname, '..', '..', 'store.sql'));
  await newMySqlImport.disconnect();
}

module.exports = {
  getUserQuery,
  getExpectedResult,
  getConnectionSequelize,
  executeMySqlImport,
};