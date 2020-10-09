const { Sequelize } = require('sequelize');

let isLocal = false;

const config = {
  db: isLocal ? 'nodejwt' : 'bankevjs_nodejwt',
  user: isLocal ? 'nodejs' : 'bankevjs_nodejs',
  password: isLocal ? 'nodejs' : 'L7LjqsdUw7y73XM',
};

module.exports = new Sequelize(config.db, config.user, config.password, {
  host: 'localhost',
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});
