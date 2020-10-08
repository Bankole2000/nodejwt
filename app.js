const express = require('express');

const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware.js');

const app = express();

// import database
const db = require('./config/database.js');

const PORT = process.env.PORT || 5000;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// Test db connection
db.authenticate()
  .then(() => {
    console.log('Database Connected...');
    console.log(db.models);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(`err => ${err}`));

// routes
const authRoutes = require('./routes/authRoutes');

app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

// // cookies
// app.get('/set-cookies', (req, res) => {
//   // res.setHeader('Set-Cookie', 'newUser = true');
//   res.cookie('newUser', false);
//   // max Age - sets expiry of cookie property
//   // secure - cookie will be set only over a secure (https) connection;
//   // httpOnly - cookie can only be accessed via http request, and not in document.cookie
//   res.cookie('isEmployee', true, {
//     maxAge: 1000 * 60 * 6 * 24,
//     secure: true,
//     httpOnly: true,
//   });

//   res.send('You got the cookie');
// });

// // Retrieving cookies - notice, becuase cookies is an object we can access with
// // dot notation for multiple cookies - e.g. cookies.newUser, or cookies.isEmployee
// app.get('/read-cookies', (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.json(cookies);
// });
