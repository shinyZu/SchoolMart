const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
var cors = require("cors");
const router = express.Router();
// app.use(express.json());

const Login = require("../models/login.models");
const User = require("../models/user.models");

// Get all signed in users
router.get("/", cors(), async (req, res) => {
  try {
    const loggedUsers = await Login.find();
    return res.status(200).json({ status: 200, data: loggedUsers });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Login User & generate JWT token
router.post("/", async (req, res) => {
  const userExist = await User.findOne({ email: req.body.username });
  const userAlreadyLogged = await Login.findOne({ email: req.body.username });

  if (userAlreadyLogged)
    return res
      .status(400)
      .send({ status: 400, message: "User already signed in." });

  if (!userExist)
    return res.status(400).send({ status: 400, message: "Invalid email." });

  const validPassword = await bcrypt.compare(
    req.body.password,
    userExist.password
  );

  if (!validPassword)
    return res.status(400).send({ status: 400, message: "Invalid password." });

  //create and assign a token
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  let data = {
    time: Date(),
    userId: userExist.user_id,
    username: req.body.username,
    password: userExist.password,
  };

  const token = jwt.sign(data, jwtSecretKey, { expiresIn: "1800s" });

  // Format the token as a Bearer token
  const bearerToken = `Bearer ${token}`;

  const user = new Login({
    email: req.body.username,
    password: userExist.password,
    user_role: userExist.user_role,
  });

  // Save the user to the database
  const loggedInUser = await user.save();
  return res.send({
    status: 200,
    message: "User signed in successfully!",
    user_id: userExist.user_id,
    token: bearerToken,
    expires_in: 1800 / 60 + " min",
  });
});

//  Logout
router.delete("/logout/:email", async (req, res) => {
  try {
    const user = await Login.findOne({ email: req.params.email });
    if (user == null) {
      return res.status(404).send({ status: 404, message: "User not found." });
    }
    let deletedUser = await user.deleteOne(user);

    return res.send({
      status: 200,
      message: "User signed out successfully!",
      data: deletedUser,
    });
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
});

module.exports = router;
