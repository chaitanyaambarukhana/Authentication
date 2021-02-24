let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require('passport')


// connect to our Book Model
let contactController = require("../controllers/contact");

//helper function for guard purposes
function requireAuth(req,res,next){
    if(!req.isAuthenticated()){
        return res.redirect('/login')
    }
    else{next();}
}

/* GET Route for the Book List page - READ OPeration */
router.get("/",requireAuth, contactController.displayContactList);

/*Adding Add page - Create operation */
router.get("/add",requireAuth,contactController.displayAddPage);

/*Post for Add page - Create Operation */
router.post("/add",requireAuth, contactController.processAddPage);

/*Adding Edit page - Update operation */
router.get("/edit/:id",requireAuth, contactController.displayEditPage);

/*Post for Edit page - Update Operation */

router.post("/edit/:id", requireAuth,contactController.processEditPage);

/* Deltet page - Delete Operation*/

router.get("/delete/:id",requireAuth, contactController.performDelete);

module.exports = router;
