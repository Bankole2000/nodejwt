const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

const capitalizeFLetters = (word) => {
  return word.replace(/^./, word[0].toUpperCase());
};

const handleErrors = (err) => {
  let errors = [];
  let errorsObject = {};

  if (err.errors != undefined) {
    errorsObject.hasErrors = true;
    if (err.errors.length > 0) {
      err.errors.forEach((error) => {
        let fieldName = capitalizeFLetters(error.path);
        let message =
          error.type == 'unique violation'
            ? `The email - ${error.value} - is already in use`
            : capitalizeFLetters(error.message);

        errors.push({
          fieldName,
          message,
        });
      });
      errorsObject.errors = errors;
    }
  } else {
    errorsObject.hasErrors = false;
    errorsObject.errors = [];
  }
  return errorsObject;
};

const maxAge = 3 * 24 * 60 * 60; // jwt uses time in seconds NOT millisends

const createToken = (id) => {
  return jwt.sign({ id }, 'custom Secret', {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  // console.log(req);
  res.render('signup');
};

module.exports.login_get = (req, res) => {
  // console.log(req);
  res.render('login');
};

module.exports.signup_post = async (req, res) => {
  let { email, password } = req.body;
  email = email ? email.toLowerCase() : null;
  User.sync({ alter: true });

  try {
    const user = await User.create({
      email,
      password,
    });
    const userToken = createToken(user.id);
    res.cookie('jwt', userToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: 'Lax',
    });
    res.status(201).json({ user });
  } catch (err) {
    let errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  User.sync({ alter: true });
  User.test('params');
  try {
    const user = await User.authenticate(email, password);
    const userToken = createToken(user.id);
    res.cookie('jwt', userToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: 'Lax',
    });
    res.status(200).json(user);
  } catch (err) {
    let errors = handleErrors(err);
    res.status(400).json(errors);
    console.log(err);
  }
};

module.exports.logout_get = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};
