const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database").default;

const User = db.define("user", {
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
});

module.exports = User;
