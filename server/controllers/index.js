/*
File Name: index.js
Student Name : Chaitanya Sai Ambarukhana
Student ID : 301150058
Date : 01/03/2021  
*/


let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

//user model instance
let userModel = require("../models/user");
let user = userModel.User;

//method to display home page
module.exports.displayHomePage = (req, res, next) => {
  res.render("home", { title: "Home",displayName:req.user?req.user.displayName:"" }); //route to "/"
};

//mthod to display about page
module.exports.displayAbout = function (req, res, next) {
  res.render("about", { title: "About me",displayName:req.user?req.user.displayName:"" }); //route to about page
};

//method to display projects page
module.exports.displayProjects = function (req, res, next) {
  res.render("projects", { title: "Projects",displayName:req.user?req.user.displayName:"" }); //route to projects page
};

//method to display services page
module.exports.displayServices = function (req, res, next) {
  res.render("services", { title: "Services" ,displayName:req.user?req.user.displayName:""}); //route to services page
};

//method to display contact page
module.exports.displayContact = function (req, res, next) {
  res.render("contact", { title: "Contact" ,displayName:req.user?req.user.displayName:""}); //route to contact page
};

//method to perform contact form operation
module.exports.performContact = function (
  req,
  res //post method requested is prcoessed here, redirecting to home page and collecting the name, email and message
) {
  console.log(req.body);
  res.render("contact-success", { title: "Contact", data: req.body });
};

//method to display login page
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

//method to process login page
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

//method to display register page
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

//method to process registration page
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

//method to perform logout
module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
