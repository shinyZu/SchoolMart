const express = require("express");
const app = express();
var cors = require("cors");
const router = express.Router();
// app.use(express.json());

const OrderDetails = require("../models/orderdetail.models");

// Get all order details - Customer
router.get("/getAll", cors(), async (req, res) => {
  try {
    const orderDetails = await OrderDetails.find();
    return res.status(200).json({ status: 200, data: orderDetails });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
