const User = require('../models/User');

const capitalizeFLetters = (word) => {
  return word.replace(/^./, word[0].toUpperCase());
};

const handleErrors = (err) => {
  let errors = [];
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
  }
  return errors;
};

module.exports.signup_get = (req, res) => {
  res.render('signup');
};

module.exports.login_get = (req, res) => {
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
    res.status(201).send('User created');
  } catch (err) {
    let errors = handleErrors(err);
    res.status(400).json(errors);
    console.log(err);
  }
};

module.exports.login_post = (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  console.log(email, password);
  res.send('User Login');
};
