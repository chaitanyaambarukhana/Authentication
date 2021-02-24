let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// connect to our Book Model
let Contact = require("../models/businessContacts");
let contactController = require("../controllers/contact");

/* GET Route for the Book List page - READ OPeration */
router.get("/", contactController.displayContactList);

/*Adding Add page - Create operation */
router.get("/add", contactController.displayAddPage);

/*Post for Add page - Create Operation */
router.post("/add", contactController.processAddPage);

/*Adding Edit page - Update operation */
router.get("/edit/:id", contactController.displayEditPage);

/*Post for Edit page - Update Operation */

router.post("/edit/:id", contactController.processEditPage);

/* Deltet page - Delete Operation*/

router.get("/delete/:id", contactController.performDelete);

module.exports = router;
