// Verification of JWT
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
var express = require("express");
var router = express.Router();

// Set up Global configuration access
dotenv.config();

router.get("/", function(req, res, next) {
  // Tokens are generally passed in header of request
  // Due to security reasons.

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
      const token = req.header(tokenHeaderKey);

      const verified = jwt.verify(token, jwtSecretKey);
      if(verified){
          return res.send("Successfully Verified");
      }else{
          // Access Denied
          return res.status(401).send(error);
      }
  } catch (error) {
      // Access Denied
      return res.status(401).send(error);
  }
});


module.exports = router;