/* 
File Name: users.js
Student Name : Chaitanya Sai Ambarukhana
Student ID : 301150058
Date : 14/02/2021  

*/

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
