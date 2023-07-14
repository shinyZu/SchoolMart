const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { auth } = require("../middleware/authenticate");

const app = express();
var cors = require("cors");
const router = express.Router();
// app.use(express.json());

const User = require("../models/user.models");

// Register User
router.post("/register", async (req, res) => {
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

// // Login User & generate JWT token
// router.post("/login", async (req, res) => {
//   const userExist = await User.findOne({ email: req.body.username });

//   if (!userExist)
//     return res.status(400).send({ status: 400, message: "Invalid email." });

//   const validPassword = await bcrypt.compare(
//     req.body.password,
//     userExist.password
//   );

//   if (!validPassword)
//     return res.status(400).send({ status: 400, message: "Invalid password." });

//   //create and assign a token
//   let jwtSecretKey = process.env.JWT_SECRET_KEY;

//   let data = {
//     time: Date(),
//     userId: userExist.user_id,
//     username: req.body.username,
//     password: userExist.password,
//   };

//   const token = jwt.sign(data, jwtSecretKey);

//   // Format the token as a Bearer token
//   const bearerToken = `Bearer ${token}`;

//   res.send({
//     status: 200,
//     message: "User signed in successfully!",
//     userId: userExist.user_id,
//     token: bearerToken,
//   });
// });

// Get all users
router.get("/getAll", cors(), auth, async (req, res) => {
  try {
    console.log("getAll");
    // let tokenVerified = validateToken(req.headers.authorization);

    // if (tokenVerified) {
    //   const users = await User.find();
    //   return res.status(200).json({ status: 200, data: users });
    // } else {
    //   return res.status(403).send({ status: 403, message: "Forbidden error." });
    // }

    const users = await User.find();
    return res.status(200).json({ status: 200, data: users });
  } catch (error) {
    res.status(500).send({ status: 500, messge: error });
  }
});

// Search user by Id
router.get("/:id", async (req, res) => {
  try {
    // const user = await User.findById(req.params.id);
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

const validateToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  const verified = jwt.verify(token, jwtSecretKey);

  if (verified) {
    return true;
  } else {
    return res.status(401).send(error);
  }
};

module.exports = router;
