let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");


// create a reference to the model
let Contact = require("../models/businessContacts");

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
  });
};

module.exports.displayAddPage = (req, res, next) => {
  res.render("business/add", { title: "Add Contact",displayName:req.user ? req.user.displayName :"" });
};

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
