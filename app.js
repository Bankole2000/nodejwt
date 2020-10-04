// const express = require("express");

const { Sequelize } = require("sequelize");
const db = new Sequelize("nodejwt", "root", "root", {
  host: "192.168.64.2",
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  // port: 3306
  // define: {
  //   freezeTableName: true
  // }
});
// const mongoose = require('mongoose');
// const bodyParser = require("body-parser");
// const path = require("path");

// const app = express();

// import database
// import * as db from "./config/database";
// const db = require("./config/database.js");

// const PORT = process.env.PORT || 5000;

// middleware
// Middle ware for bodyParser
// app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.json());

// view engine
// app.set("view engine", "ejs");

// database connection
// const dbURI = 'mongodb+srv://shaun:test1234@cluster0.del96.mongodb.net/node-auth';
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
//   .then((result) => app.listen(3000))
//   .catch((err) => console.log(err));

// Test db connection
db.authenticate()
  .then(() => {
    console.log("Database Connected...");
    // console.log(db.models);
    // app.listen(PORT, () => {
    //   console.log(`Server listening on port ${PORT}`);
    // });
  })
  .catch((err) => console.log(`err => ${err}`));

// db.sync();

// routes
// const authRoutes = require("./routes/authRoutes");
// app.get("/", (req, res) => res.render("home"));
// app.get("/smoothies", (req, res) => res.render("smoothies"));
// app.use(authRoutes);
