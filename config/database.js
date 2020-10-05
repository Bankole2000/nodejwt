const { Sequelize } = require('sequelize');

module.exports = new Sequelize('nodejwt', 'nodejs', 'nodejs', {
  host: 'localhost',
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});
