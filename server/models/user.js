/*
File Name: user.js
Student Name : Chaitanya Sai Ambarukhana
Student ID : 301150058
Date : 01/03/2021  
*/

//creating a mongoose schema and exporting it as model.


//modules required for user Model

let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let user = mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
      trim: true,
      required: "USername is required",
    },
    email: {
      type: String,
      default: "",
      trim: true,
      required: "Email address is required",
    },
    displayName: {
      type: String,
      default: "",
      trim: true,
      required: "displayName is required",
    },
    created: {
      type: Date,
      default: Date.now,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
  }
);

//configure options for our user model

let options = { missingPasswordError: "Wrong/missing Password" };

user.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model("user", user);
