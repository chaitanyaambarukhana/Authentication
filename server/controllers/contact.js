/*
File Name: contact.js
Student Name : Chaitanya Sai Ambarukhana
Student ID : 301150058
Date : 01/03/2021  
*/


let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");


// create a reference to the model
let Contact = require("../models/businessContacts");


//method to display contact page
module.exports.displayContactList = (req, res, next) => {
  Contact.find((err, ContactList) => {
    if (err) {
      return console.error(err);
    } else {
      

      res.render("business/list", {
        title: "Business contacts",
        ContactList: ContactList,
        displayName:req.user ? req.user.displayName :""
      });
    }
  }).sort({"name":1});
};

//method to display add page
module.exports.displayAddPage = (req, res, next) => {
  res.render("business/add", { title: "Add Contact",displayName:req.user ? req.user.displayName :"" });
};

//method to process add page
module.exports.processAddPage = (req, res, next) => {
  let newContact = Contact({
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
  });
  Contact.create(newContact, (err, Contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/businessContacts");
    }
  });
};

//method to display edit page
module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;

  Contact.findById(id, (err, contactToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render("business/edit", {
        title: "Edit Contact",
        contact: contactToEdit,
        displayName:req.user ? req.user.displayName :""
      });
    }
  });
};

//method to process edit page
module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id;

  let updatedcontact = Contact({
    _id: id,
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
  });
  Contact.updateOne({ _id: id }, updatedcontact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/businessContacts");
    }
  });
};

//method to perfom delete operation
module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;

  Contact.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect("/businessContacts");
    }
  });
};
