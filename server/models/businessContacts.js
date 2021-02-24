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
