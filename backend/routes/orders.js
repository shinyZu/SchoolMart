const express = require("express");
const {
  authenticateAdminToken,
  authenticateCustomerToken,
} = require("../middleware/auth");

const app = express();
const cors = require("cors");
const router = express.Router();
// app.use(express.json());

const Orders = require("../models/orders.models");
const OrderDetails = require("../models/orderdetail.models");

// Get all orders - Admin
router.get("/getAll", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const orders = await Orders.find();
    return res.status(200).json({ status: 200, data: orders });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Search orders by Id - Admin
router.get("/admin/:id", cors(), authenticateAdminToken, async (req, res) => {
  try {
    const orderExist = await Orders.findOne({
      order_id: req.params.id,
    });
    if (!orderExist) {
      return res.status(404).send({ status: 404, message: "Order not found." });
    }
    return res.send({
      status: 200,
      data: orderExist,
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Place Order - Customer
router.post("/", cors(), authenticateCustomerToken, async (req, res) => {
  const body = req.body;

  try {
    // Get the last inserted category_code from the database
    const lastOrder = await Orders.findOne({}, {}, { sort: { order_id: -1 } });
    let nextOrderId = 1;

    console.log("lastOrder: " + lastOrder);

    if (lastOrder) {
      nextOrderId = lastOrder.order_id + 1;
    }
    console.log("nextOrderId: " + nextOrderId);

    // Create a new order instance
    const newOrder = new Orders({
      order_id: nextOrderId,
      order_date: body.order_date,
      order_cost: body.order_cost,
      order_status: body.order_status,
      user_id: body.user_id,
    });

    console.log(body.order_details);
    for (let od of body.order_details) {
      // Create a new order detail instance
      const newOrderDetail = new OrderDetails({
        order_id: nextOrderId,
        st_code: od.st_code,
        order_qty: od.order_qty,
      });

      // Save the order details
      const savedOrderDetail = await newOrderDetail.save();
    }

    // Save the order to the database
    const savedOrder = await newOrder.save();
    res.send({
      status: 201,
      category: savedOrder,
      message: "Order placed successfully!",
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Update Order - Customer
router.put("/:id", cors(), authenticateCustomerToken, async (req, res) => {
  try {
    const body = req.body;
    const req_order_details = req.body.order_details;

    const orderExist = await checkOrderExist(req.params.id, res);
    const orderDetailsExist = await checkOrderDetailExist(req.params.id, res);

    // Set new order data
    orderExist.order_date = body.order_date;
    orderExist.order_cost = body.order_cost;
    orderExist.order_status = body.order_status;
    orderExist.user_id = body.user_id;

    // Set new order detail data
    // if (orderDetailsExist.length > 0) {
    //   for (let od of orderDetailsExist) {
    //     for (let rod of req_order_details) {
    //       od.st_code = rod.st_code;
    //       od.order_qty = rod.order_qty;

    //       // Update the order detail in the database
    //       await orderDetailsExist.save();
    //     }
    //   }
    // }

    // Update the order in the database
    const updatedOrder = await orderExist.save();

    return res.send({
      status: 200,
      user: updatedOrder,
      message: "Order updated successfully!",
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Delete Order - Customer
router.delete("/:id", cors(), authenticateCustomerToken, async (req, res) => {
  try {
    const orderExist = await checkOrderExist(req.params.id, res);

    let deletedOrder = await Orders.deleteOne(orderExist);

    return res.send({
      status: 200,
      message: "Order deleted successfully!",
      data: deletedOrder,
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

const checkOrderExist = async (id, res) => {
  const orderExist = await Orders.findOne({
    order_id: id,
  });

  if (!orderExist) {
    return res.status(404).send({ status: 404, message: "Order not found." });
  } else {
    return orderExist;
  }
};

const checkOrderDetailExist = async (id, res) => {
  const orderDetailExist = await OrderDetails.findOne({
    order_id: id,
  });

  if (!orderDetailExist) {
    return res
      .status(404)
      .send({ status: 404, message: "OrderDetail not found." });
  } else {
    return orderDetailExist;
  }
};

module.exports = router;
