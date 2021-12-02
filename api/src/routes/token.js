// Main Code Here  //
// Generating JWT
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

var express = require("express");
var router = express.Router();
// Set up Global configuration access
dotenv.config();

router.post("/", function(req, res, next) {

  // Validate User Here
  // Then generate JWT Token

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
      time: Date(),
      userId: 12,
  }

  const token = jwt.sign(data, jwtSecretKey);

  res.send(token);
});

module.exports = router;