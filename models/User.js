const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const bcrypt = require('bcrypt');

const userModel = {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'email field cannot be empty',
      },
      isEmail: {
        msg: 'must be a Valid Email',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      minLength(value) {
        if (value.length < 6) {
          throw new Error('Password must have at least 6 characters');
        }
      },
      // Examples of custom validators:
      // isEven(value) {
      //   if (parseInt(value) % 2 !== 0) {
      //     throw new Error('Only even values are allowed!');
      //   }
      // },
      // isGreaterThanOtherField(value) {
      //   if (parseInt(value) <= parseInt(this.otherField)) {
      //     throw new Error('Bar must be greater than otherField.');
      //   }
      // }
    },
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
};

// Add hooks to User instance
const User = db.define('user', userModel, {
  hooks: {
    beforeCreate: async (user, options) => {
      try {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        console.log('user was created', user);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

module.exports = User;
