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

const Login = require("../models/login.models");
const User = require("../models/user.models");

// Get all signed in users - Admin
router.get("/", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const loggedUsers = await Login.find();
    return res.status(200).json({ status: 200, data: loggedUsers });
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Login User & generate JWT token -  in use
router.post("/", cors(), async (req, res) => {
  try {
    console.log(req.body);
    const userExist = await User.findOne({ email: req.body.username });
    const userAlreadyLogged = await Login.findOne({ email: req.body.username });

    if (userAlreadyLogged)
      return res
        .status(400)
        .send({ status: 400, message: "User already signed in." });

    if (!userExist)
      return res
        .status(400)
        .send({ status: 400, message: "Invalid credentials." });

    const validPassword = await bcrypt.compare(
      req.body.password,
      userExist.password
    );

    if (!validPassword)
      return res
        .status(400)
        .send({ status: 400, message: "Invalid password." });

    // ------------------------------------------------------
    // //create and assign a token
    // let jwtSecretKey = process.env.JWT_SECRET_KEY;
    // let jwtRefreshKey = process.env.JWT_REFRESH_KEY;

    // let data = {
    //   time: Date(),
    //   user_id: userExist.user_id,
    //   username: req.body.username,
    //   password: userExist.password,
    //   user_role: userExist.user_role,
    // };

    // // const accessToken = jwt.sign(data, jwtSecretKey, { expiresIn: "1800s" });
    // // const refreshToken = jwt.sign(data, jwtRefreshKey, { expiresIn: "3600s" });

    // const accessToken = jwt.sign(data, jwtSecretKey);
    // const refreshToken = jwt.sign(data, jwtRefreshKey);

    // // Format the tokens as Bearer token
    // const bearer_accessToken = `Bearer ${accessToken}`;
    // const bearer_refreshToken = `Bearer ${refreshToken}`;

    // const login = new Login({
    //   email: req.body.username,
    //   password: userExist.password,
    //   user_role: userExist.user_role,
    // });

    // // Save the user to the database
    // const loggedInUser = await login.save();
    // ------------------------------------------------------

    // Create a new user instance
    // const reqDetails = new User({
    //   email: body.email,
    //   password: req.body.password,
    //   user_role: userExist.user_role,
    // });

    const tokenData = await generateToken(
      userExist.user_id,
      req.body.username,
      userExist.password,
      userExist.user_role,
      res
    );
    console.log("=============== tokenData in login.js: ===============");
    console.log(tokenData);

    if (tokenData) {
      // return res.send({
      //   status: 200,
      //   message: "User signed in successfully!",
      //   user_id: userExist.user_id,
      //   user_role: userExist.user_role,
      //   access_token: bearer_accessToken,
      //   // expires_in: 3600 / 60 + " min",
      //   // expires_in: "2m",
      //   refresh_token: bearer_refreshToken,
      // });
      return res.status(200).send({
        status: 200,
        message: "User signed in successfully!",
        data: tokenData,
      });
    } else {
      return res.status(400).send({ status: 400, message: "Failed to login." });
    }
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
});

//  Logout
router.delete("/logout/:email", cors(), async (req, res) => {
  try {
    const user = await Login.findOne({ email: req.params.email });
    if (user == null) {
      return res.status(404).send({ status: 404, message: "User not found." });
    }
    let deletedUser = await user.deleteOne(user);

    return res.status(200).send({
      status: 200,
      message: "User signed out successfully!",
      data: deletedUser,
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Test call from user.js router to login user after registering user
router.get("/test/login", cors(), async (req, res) => {
  try {
    let data = myFunction();
    return res.json(data);

    // return res.status(200).send({
    //   status: 200,
    //   message: "Called test API in Login",
    // });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

const myFunction = () => {
  console.log("called test login");
  const data = { message: "Called test API in Login" };
  console.log(data);
  return data;
};

// const generateToken = async (user_id, username, hashedPasssword, user_role, res) => {
const generateToken = async (
  user_id,
  username,
  hashedPassword,
  user_role,
  res
) => {
  try {
    // const validPassword = await bcrypt.compare(body.password, userExist.password);

    // if (!validPassword)
    //   return res
    //     .status(400)
    //     .send({ status: 400, message: "Invalid password." });

    //create and assign a token
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let jwtRefreshKey = process.env.JWT_REFRESH_KEY;

    let data = {
      time: Date(),
      user_id: user_id,
      username: username,
      password: hashedPassword,
      user_role: user_role,
    };

    console.log(data);

    // const accessToken = jwt.sign(data, jwtSecretKey, { expiresIn: "1800s" });
    // const refreshToken = jwt.sign(data, jwtRefreshKey, { expiresIn: "3600s" });

    const accessToken = jwt.sign(data, jwtSecretKey);
    const refreshToken = jwt.sign(data, jwtRefreshKey);

    // Format the tokens as Bearer token
    const bearer_accessToken = `${accessToken}`;
    const bearer_refreshToken = `${refreshToken}`;

    const login = new Login({
      email: username,
      password: hashedPassword,
      user_role: user_role,
    });

    // Save the user to the database
    const loggedInUser = await login.save();
    let tokenObj = {
      // logged_user: loggedInUser,
      user_id: user_id,
      user_role: user_role,
      token_type: "Bearer",
      access_token: bearer_accessToken,
      refresh_token: bearer_refreshToken,
      // expires_in: 3600 / 60 + " min",
      // expires_in: "2m",
    };
    return tokenObj;

    // return res.status(200).send({
    //   status: 200,
    //   message: "User signed in successfully!",
    // user_id: userExist.user_id,
    // user_role: userExist.user_role,
    // access_token: bearer_accessToken,
    // // expires_in: 3600 / 60 + " min",
    // // expires_in: "2m",
    // refresh_token: bearer_refreshToken,
    // });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
};

// module.exports = router;

module.exports = {
  myFunction,
  generateToken,
  router,
};
