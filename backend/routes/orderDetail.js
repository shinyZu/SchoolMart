const express = require("express");
const {
  authenticateAdminToken,
  authenticateCustomerToken,
  verifyToken,
} = require("../middleware/auth");

const app = express();
const cors = require("cors");
const router = express.Router();
// app.use(express.json());

const Orders = require("../models/orders.models");
const OrderDetails = require("../models/orderdetail.models");

// Get all order details - Admin
router.get("/getAll", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const orderDetails = await OrderDetails.find();
    return res.status(200).json({ status: 200, data: orderDetails });
  } catch (error) {
    // res.status(500).send(error);
    return res.status(500).send({ status: 500, message: error.message });
  }
});

// Get all order details by user_id - Customer
router.get(
  "/user/getAll",
  cors(),
  authenticateCustomerToken,
  async (req, res) => {
    try {
      const verified = verifyToken(req.headers.authorization, res);

      const orders = await Orders.find({ user_id: verified.userId });
      const orderDetails = [];
      if (orders.length > 0) {
        for (let obj of orders) {
          orderDetails.push(
            await OrderDetails.find({ order_id: obj.order_id })
          );
        }
      }
      // console.log(orderDetails);

      return res.status(200).json({ status: 200, data: orderDetails });
    } catch (error) {
      // res.status(500).send(error);
      return res.status(500).send({ status: 500, message: error.message });
    }
  }
);

// Get all order details by userId  & orderId - Customer
router.get(
  "/user/getAll/:orderId",
  cors(),
  authenticateCustomerToken,
  async (req, res) => {
    try {
      const verified = verifyToken(req.headers.authorization, res);

      const orderFound = await Orders.findOne({
        order_id: req.params.orderId,
        user_id: verified.userId,
      });

      // console.log(orders);

      if (!orderFound) {
        return res
          .status(404)
          .send({ status: 404, message: "Order not found." });
      }
      const orderDetails = await OrderDetails.find({
        order_id: orderFound.order_id,
      });
      // console.log(orderDetails);

      return res.status(200).json({ status: 200, data: orderDetails });
    } catch (error) {
      // res.status(500).send(error);
      return res.status(500).send({ status: 500, message: error.message });
    }
  }
);
module.exports = router;
