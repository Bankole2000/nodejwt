const { Sequelize } = require("sequelize");

module.exports = new Sequelize("nodejwt", "root", "root", {
  host: "192.168.64.2",
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  // port: 3306
  // define: {
  //   freezeTableName: true
  // }
});
