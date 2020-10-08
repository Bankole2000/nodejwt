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

        throw this.LoginError(
          'Incorrect Password',
          'password'
          // {
          // errors: [{ message: 'Incorrect Password', path: 'password' }],}
        );
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

// const userModel = {
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       notNull: {
//         msg: 'email field cannot be empty',
//       },
//       isEmail: {
//         msg: 'must be a Valid Email',
//       },
//     },
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       minLength(value) {
//         if (value.length < 6) {
//           throw new Error('Password must have at least 6 characters');
//         }
//       },
//       // Examples of custom validators:
//       // isEven(value) {
//       //   if (parseInt(value) % 2 !== 0) {
//       //     throw new Error('Only even values are allowed!');
//       //   }
//       // },
//       // isGreaterThanOtherField(value) {
//       //   if (parseInt(value) <= parseInt(this.otherField)) {
//       //     throw new Error('Bar must be greater than otherField.');
//       //   }
//       // }
//     },
//   },
//   uuid: {
//     type: DataTypes.UUID,
//     defaultValue: Sequelize.UUIDV4,
//   },
// };

// Add hooks to User instance
// const User = db.define('user', userModel, {
//   hooks: {
//     beforeCreate: async (user, options) => {
//       try {
//         const salt = await bcrypt.genSalt();
//         user.password = await bcrypt.hash(user.password, salt);
//         console.log('user was created', user);
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   },
//   instanceMethods: {
//     authenticate: async function (email, password) {
//       const user = await this.findOne({ where: { email } });
//       if (user) {
//         const auth = bcrypt.compareSync(password, user.password); //returns a boolean
//         if (auth) {
//           return user;
//         } else {
//           throw new Error(
//             'Incorrect Password'
//             // {
//             // errors: [{ message: 'Incorrect Password', path: 'password' }],}
//           );
//         }
//       } else {
//         throw new Error('Email is not registered');
//       }
//     },
//   },
// });

// User.authenticate = async function (email, password) {
//   const user = await User.findOne({ where: { email } });

//   if (user) {
//     const auth = bcrypt.compareSync(password, user.password); //returns a boolean
//     if (auth) {
//       return user;
//     } else {
//       throw new Error({
//         errors: [{ message: 'Incorrect Password', path: 'password' }],
//       });
//     }
//   }
//   throw new Error({
//     errors: [{ message: "This email isn't registered", path: 'email' }],
//   });
// };

module.exports = User;
