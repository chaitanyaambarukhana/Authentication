/* 
File Name: index.js
Student Name : Chaitanya Sai Ambarukhana
Student ID : 301150058
Date : 01/03/2021  
*/

//routing to the pages using the methods described in their respective controllers

let express = require("express");

let router = express.Router();
let indexController = require("../controllers/index")

router.use(express.urlencoded());
/* GET home page. */
router.get("/", indexController.displayHomePage)

router.get("/home",indexController.displayHomePage );

//about page
router.get("/about", indexController.displayAbout);

//projects page
router.get("/projects", indexController.displayProjects);

//services page
router.get("/services",indexController.displayServices );

//contact page
router.get("/contact", indexController.displayContact);
//perform post in contact page
router.post("/contact",indexController.performContact );

/*Adding Login page  */
router.get("/login", indexController.displayLoginPage);

/*Post for login page  */
router.post("/login", indexController.processLoginPage);

/*Adding Register page  */
router.get("/register", indexController.displayRegisterPage);

/*Post for register page  */
router.post("/register", indexController.processRegisterPage);

/*To perform logout*/

router.get("/logout", indexController.performLogout);

module.exports = router;
