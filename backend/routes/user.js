const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  authenticateAdminToken,
  authenticateCustomerToken,
} = require("../middleware/auth");

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
    return res.send({
      status: 201,
      user: savedUser,
      message: "User registered successfully!",
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

// Get all users
// Authorized only for Admins
router.get("/getAll", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ status: 200, data: users });
  } catch (error) {
    return res.status(500).send({ status: 500, messge: error });
  }
});

// Search user by Id
// Authorized only for Admins
router.get("/admin/:id", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
    if (user == null) {
      return res.status(404).send({ status: 404, message: "User not found." });
    }
    return res.send({
      status: 200,
      data: user,
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Search user by Id
// Authorized only for Customers to get their own details
router.get("/:id", cors(), authenticateCustomerToken, async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
    if (req.email == user.email) {
      if (user == null) {
        return res
          .status(404)
          .send({ status: 404, message: "User not found." });
      }
      return res.send({
        status: 200,
        data: user,
      });
    } else {
      return res.status(403).send({ status: 403, messge: "Access denied." });
    }
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Search user by Name

// Update User
// Authorized only for Customers to get their own details
router.put("/:id", cors(), authenticateCustomerToken, async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ user_id: req.params.id });

  if (req.email == user.email) {
    if (user == null) {
      return res.status(404).send({ status: 404, message: "User not found." });
    }
    user.email = body.email;
    user.password = body.password;
    user.address = body.address;
    user.contact_no = body.contact_no;
    user.user_role = body.user_role;

    // Update the user in the database
    const updatedUser = await user.save();
    return res.send({
      status: 200,
      user: updatedUser,
      message: "User updated successfully!",
    });
  } else {
    return res.status(403).send({ status: 403, messge: "Access denied." });
  }
});

// Delete Admin Account
// Authorized only for Admins to delete their own account
router.delete(
  "/admin/:id",
  cors(),
  authenticateAdminToken,
  async (req, res) => {
    try {
      const userExist = await User.findOne({
        user_id: req.params.id,
      });
      if (req.email == userExist.email) {
        if (userExist == null) {
          return res
            .status(404)
            .send({ status: 404, message: "User not found." });
        }
        let deletedUser = await User.deleteOne(userExist);

        return res.send({
          status: 200,
          message: "User deleted successfully!",
          data: deletedUser,
        });
      } else {
        return res.status(403).send({ status: 403, messge: "Access denied." });
      }
    } catch (err) {
      return res.status(400).send({ status: 400, message: err.message });
    }
  }
);

// Delete Customer Account
// Authorized only for Customers to delete their own account
router.delete("/:id", cors(), authenticateCustomerToken, async (req, res) => {
  try {
    const userExist = await User.findOne({
      user_id: req.params.id,
    });
    if (req.email == userExist.email) {
      if (userExist == null) {
        return res
          .status(404)
          .send({ status: 404, message: "User not found." });
      }
      let deletedUser = await User.deleteOne(userExist);

      return res.send({
        status: 200,
        message: "User deleted successfully!",
        data: deletedUser,
      });
    } else {
      return res.status(403).send({ status: 403, messge: "Access denied." });
    }
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

module.exports = router;
