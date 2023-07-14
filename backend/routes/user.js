const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  authenticateToken,
  refreshToken,
} = require("../middleware/authenticate");

const app = express();
const cors = require("cors");
const router = express.Router();
// app.use(express.json());

const User = require("../models/user.models");

// Register User - in user
router.post("/register", cors(), async (req, res) => {
  const body = req.body;

  try {
    // Check if user already exists
    const emailExist = await User.findOne({ email: body.email });
    if (emailExist) {
      return res
        .status(400)
        .json({ status: 400, message: "Email already exists." });
    }

    const contactExist = await User.findOne({ contact_no: body.contact_no });
    if (contactExist) {
      return res
        .status(400)
        .send({ status: 400, message: "Contact number already exists." });
    }

    // Get the last inserted user_id from the database
    const lastUser = await User.findOne({}, {}, { sort: { user_id: -1 } });
    let nextUserId = 1;

    if (lastUser) {
      nextUserId = lastUser.user_id + 1;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // Create a new user instance
    const user = new User({
      user_id: nextUserId,
      email: body.email,
      password: hashedPassword,
      address: body.address,
      contact_no: body.contact_no,
      user_role: body.user_role,
    });

    // Save the user to the database
    const savedUser = await user.save();
    res.send({
      status: 201,
      user: savedUser,
      message: "User registered successfully!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get all users
router.get("/getAll", cors(), authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ status: 200, data: users });
  } catch (error) {
    res.status(500).send({ status: 500, messge: error });
  }
});

// Search user by Id
router.get("/:id", cors(), authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
    if (user == null) {
      res.status(404).send({ status: 404, message: "User not found." });
      return;
    }
    res.send({
      status: 200,
      data: user,
    });
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
});

module.exports = router;
