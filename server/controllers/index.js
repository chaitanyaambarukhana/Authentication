let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

//user model instance
let userModel = require("../models/user");
let user = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
  res.render("home", { title: "Home" }); //route to "/"
};

module.exports.displayAbout = function (req, res, next) {
  res.render("about", { title: "About me" }); //route to about page
};

module.exports.displayProjects = function (req, res, next) {
  res.render("projects", { title: "Projects" }); //route to projects page
};

module.exports.displayServices = function (req, res, next) {
  res.render("services", { title: "Services" }); //route to services page
};

module.exports.displayContact = function (req, res, next) {
  res.render("contact", { title: "Contact" }); //route to contact page
};

module.exports.performContact = function (
  req,
  res //post method requested is prcoessed here, redirecting to home page and collecting the name, email and message
) {
  console.log(req.body);
  res.render("contact-success", { title: "Contact", data: req.body });
};

module.exports.displayLoginPage = (req, res, next) => {
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      } else {
        res.redirect("/businessContacts");
      }
    });
  })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processRegisterPage = (req, res, next) => {
  //instantiate a user obj
  let newUser = new user({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName,
  });
  user.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error inserting New user");
      if (err.name == "UserExistsError") {
        req.flash("registerMessage", "Registration Error: User Already Exists");
        console.log("Error: User Already Exists");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : "",
      });
    } else {
      //if no error exists, then registeration is successful
      //redirect the user
      return passport.authenticate("local")(req, res, () => {
        res.redirect("/businessContacts");
      });
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
