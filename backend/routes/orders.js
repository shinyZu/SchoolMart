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

const Stationery = require("../models/stationery.models");
const Orders = require("../models/orders.models");
const OrderDetails = require("../models/orderdetail.models");

const stationery = require("./stationery");

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

// Search order by Id - Customer
router.get(
  "/customer/:orderId",
  cors(),
  authenticateCustomerToken,
  async (req, res) => {
    try {
      const verified = verifyToken(req.headers.authorization, res);

      const orderFound = await Orders.findOne({
        order_id: req.params.orderId,
        user_id: verified.user_id,
      });

      if (!orderFound) {
        return res
          .status(404)
          .send({ status: 404, message: "Order not found." });
      }

      return res.send({
        status: 200,
        data: orderFound,
      });
    } catch (err) {
      return res.status(400).send({ status: 400, message: err.message });
    }
  }
);

// Get Last 8 Orders of Customer - Customer
router.get("/latest", cors(), authenticateCustomerToken, async (req, res) => {
  try {
    const verified = verifyToken(req.headers.authorization, res);
    const user_id = verified.user_id;
    const lastEightRecords = await Orders.find({ user_id })
      .sort({ order_id: -1 })
      .limit(8);

    let lastEightOrdersWithDetails = [];
    let lastEightOrderDetailsWithImages = [];
    let historyRecord = null;

    for (let i = 0; i < lastEightRecords.length; i++) {
      const order = lastEightRecords[i];

      // Get order details of order
      let orderDetails = await OrderDetails.find({
        order_id: lastEightRecords[i].order_id,
      });

      const stationeryPromises = [];
      for (let j = 0; j < orderDetails.length; j++) {
        // Get the promise for Stationery.findOne call
        const promise = Stationery.findOne({
          st_code: orderDetails[j].st_code,
        });

        // Push the promise to the array
        stationeryPromises.push(promise);
      }

      // Await all the Stationery.findOne calls simultaneously
      const stationeryItems = await Promise.all(stationeryPromises);
      orderDetails = orderDetails.map((obj, index) => ({
        ...obj,
        st_name: stationeryItems[index].st_name,
        image_url: stationeryItems[index].image_url,
        unit_price: stationeryItems[index].unit_price,
      }));

      lastEightOrderDetailsWithImages = [];
      for (let k = 0; k < orderDetails.length; k++) {
        if (orderDetails[k]._doc.order_id == lastEightRecords[i].order_id) {
          let details = {
            order_details: orderDetails[k]._doc,
            st_name: orderDetails[k].st_name,
            image_url: orderDetails[k].image_url,
            unit_price: orderDetails[k].unit_price,
          };
          lastEightOrderDetailsWithImages.push(details);
        }
      }

      historyRecord = {
        order: lastEightRecords[i],
        details: lastEightOrderDetailsWithImages,
      };

      lastEightOrdersWithDetails.push(historyRecord);
    }

    return res.status(200).send({
      status: 200,
      data: lastEightOrdersWithDetails,
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Place Order - Customer
// Saves both order & orderDetails
router.post("/", cors(), authenticateCustomerToken, async (req, res) => {
  const body = req.body;

  try {
    const verified = verifyToken(req.headers.authorization, res);

    if (verified.user_id != body.user_id) {
      return res.status(403).send({ status: 403, message: "Access denied." });
    }

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
      console.log(savedOrderDetail);

      // Update product qtyOnHand
      if (savedOrderDetail) {
        let stationeryExist = await stationery.checkStationeryExist(od.st_code);
        stationeryExist.qty_on_hand -= od.order_qty;
        // Update the stationery qty in the database
        // let updatedStationery = await stationery.updateQtyOnHand(
        //   stationeryExist,
        //   res
        // );
        const updatedStationery = await stationeryExist.save();
      }
    }

    // Save the order to the database
    const savedOrder = await newOrder.save();
    res.status(201).send({
      status: 201,
      category: savedOrder,
      message: "Order placed successfully!",
    });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
});

// Update Order - Customer
// Updates both order & orderDetails
router.put("/:id", cors(), authenticateCustomerToken, async (req, res) => {
  try {
    const body = req.body;
    const verified = verifyToken(req.headers.authorization, res);

    if (verified.user_id != body.user_id) {
      return res.status(403).send({ status: 403, message: "Access denied." });
    }

    const req_order_details = req.body.order_details;

    const orderExist = await checkOrderExist(req.params.id, res);
    const orderDetailsExist = await checkOrderDetailExist(req.params.id, res);
    // console.log(orderDetailsExist);

    // Set new order data
    orderExist.order_date = body.order_date;
    orderExist.order_cost = body.order_cost;
    orderExist.order_status = body.order_status;
    orderExist.user_id = body.user_id;

    // Consider that after placing the order it cannot delete items from the ordered list or add new items to the same list.
    // can only update orderQty

    // Set new order detail data
    if (orderDetailsExist.length > 0) {
      for (let i = 0; i < orderDetailsExist.length; i++) {
        orderDetailsExist[i].st_code = req_order_details[i].st_code;
        orderDetailsExist[i].order_qty = req_order_details[i].order_qty;

        // Update the order detail in the database
        await orderDetailsExist[i].save();
      }
    }

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
// Deletes both order & orderDetails
router.delete("/:id", cors(), authenticateCustomerToken, async (req, res) => {
  try {
    const orderExist = await checkOrderExist(req.params.id, res);

    const verified = verifyToken(req.headers.authorization, res);

    if (verified.user_id != orderExist.user_id) {
      return res.status(403).send({ status: 403, message: "Access denied." });
    }

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
  const orderDetailExist = await OrderDetails.find({
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
