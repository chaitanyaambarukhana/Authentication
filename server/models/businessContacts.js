/*
File Name: businessContacts.js
Student Name : Chaitanya Sai Ambarukhana
Student ID : 301150058
Date : 01/03/2021  
*/

//creating mongoose schema for the contacts collection and exporting it as a model
let mongoose = require("mongoose");
mongoose.set("debug", true);

//create a model class
let contactsModel = new mongoose.Schema(
  {
    name: String,
    number: String,
    email: String,
  },
  { collection: "contacts" }
);

module.exports = mongoose.model("Contacts", contactsModel);
