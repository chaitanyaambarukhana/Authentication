/*
File Name: app.js
Student Name : Chaitanya Sai Ambarukhana
Student ID : 301150058
Date : 01/03/2021  
*/

//App.js is the manifest for the whole application

let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let mongoose = require("mongoose"); //importing mongoose

//modules for authentication
let session = require("express-session");
let passport = require("passport");
let passportLocal = require("passport-local");
let localStrategy = passportLocal.Strategy;
let flash = require("connect-flash");

//database setup. Importing the database.js file here
let db = require("./db");

//connecting mongoose to mongodb
mongoose.connect(db.URI, { useNewUrlParser: true, useUnifiedTopology: true });

let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind("connection Error: "));
mongoDB.once("open", () => {
  console.log("connected to MongoDB");
});

//importing routes
let indexRouter = require("../routes/index");
let usersRouter = require("../routes/users");
let contactsRouter = require("../routes/businessContacts");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../node_modules")));

//setup express sessions
app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);

//setup flash
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
//passport user config
//create an object of User model
let userModel = require("../models/user");
let user = userModel.User;

//implement a user authentication strategy
passport.use(user.createStrategy());

//serialize and deserialize the user info
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/businessContacts", contactsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
