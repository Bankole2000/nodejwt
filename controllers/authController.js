const User = require("../models/User");

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = (req, res) => {
  const { email, password } = req.body;
  // User.sync();

  // try {
  User.create({
    email,
    password
  })
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
  // } catch (err) {
  //   console.log(err);
  // }
  // })
  // .catch((err) => console.log(err));

  // res.send("New Signup");
};

module.exports.login_post = (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  console.log(email, password);
  res.send("User Login");
};
