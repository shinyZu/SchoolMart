const express = require("express");
const app = express();
var cors = require("cors");
const router = express.Router();
// app.use(express.json());

const BillingDetails = require("../models/billinginfo.models");

router.get("/", cors(), async (req, res) => {
  try {
    // const users = await User.find();
    // res.json(users);
    return res.status(200).send("BillingDetails API working!");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
