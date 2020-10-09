const { Model, Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const bcrypt = require('bcrypt');

class User extends Model {
  static LoginError(message, field) {
    const errors = [];
    errors.push({ message, path: field });

    return { errors };
  }
  static test(a) {
    console.log(a);
  }
  static async authenticate(email, password) {
    const user = await this.findOne({ where: { email } });
    if (user) {
      const auth = bcrypt.compareSync(password, user.password); //returns a boolean
      if (auth) {
        return user;
      } else {
        console.log(auth);

        throw this.LoginError('Incorrect Password', 'password');
      }
    } else {
      throw this.LoginError('Email is not registered', 'email');
    }
  }
}

User.init(
  {
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
      },
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
  },
  {
    sequelize: db,
    modelName: 'user',
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
  }
);

module.exports = User;
