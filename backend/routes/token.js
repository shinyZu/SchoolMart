const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
var cors = require("cors");
const router = express.Router();

// Generating Token
router.post("/user/generateToken", async (req, res) => {
  // Validate User Here - if a user exists in the db with the given credentials
  console.log(req.body.username);

  // Then generate JWT Token
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  const salt = await bcrypt.genSalt(10);
  hashedPassword = await bcrypt.hash(req.body.password, salt);

  let data = {
    time: Date(),
    userId: 12,
    username: req.body.username,
    password: hashedPassword,
  };

  const token = jwt.sign(data, jwtSecretKey);

  // Format the token as a Bearer token
  const bearerToken = `Bearer ${token}`;

  //res.send(bearerToken);
  res.json({ token: bearerToken });
});

// Validating Token
const validateToken = router.get(
  "/user/validateToken",
  cors(),
  async (req, res) => {
    // Tokens are generally passed in the header of the request due to security reasons.

    let tokenHeaderKey = process.env.JWT_TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
      // const token = req.header(tokenHeaderKey);
      const authHeader = req.headers.authorization;
      console.log("authHeader: " + authHeader);

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid token format." });
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "No token provided." });
      }

      const verified = jwt.verify(token, jwtSecretKey);
      console.log("verified: " + verified);

      if (verified) {
        // return res.send("Successfully Verified!");
        return true;
      } else {
        // Access Denied
        return res.status(401).send(error);
      }
    } catch (error) {
      // Access Denied
      return res.status(401).send(error);
      //return res.status(403).json({ message: "Failed to authenticate token." });
    }
  }
);

module.exports = router;
// module.exports = validateToken;
