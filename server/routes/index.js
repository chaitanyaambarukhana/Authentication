/* 
File Name: index.js
Student Name : Chaitanya Sai Ambarukhana
Student ID : 301150058
Date : 14/02/2021  

*/
let express = require("express");

let router = express.Router();

router.use(express.urlencoded());
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home", { title: "Home" }); //route to "/"
});

router.get("/home", function (req, res, next) {
  res.render("home", { title: "Home" }); //route to "/home"`
});

//about page
router.get("/about", function (req, res, next) {
  res.render("about", { title: "About me" }); //route to about page
});

//projects page
router.get("/projects", function (req, res, next) {
  res.render("projects", { title: "Projects" }); //route to projects page
});

//services page
router.get("/services", function (req, res, next) {
  res.render("services", { title: "Services" }); //route to services page
});

//contact page
router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Contact" }); //route to contact page
});

router.post("/contact", function (
  req,
  res //post method requested is prcoessed here, redirecting to home page and collecting the name, email and message
) {
  console.log(req.body);
  res.render("contact-success", { title: "Contact", data: req.body });
});

module.exports = router;
