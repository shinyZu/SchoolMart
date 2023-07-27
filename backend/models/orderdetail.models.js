const mongoose = require("mongoose");
const validator = require("validator");

const Orders = mongoose.model("Orders");
// const Orders = require("../models/orders.models");

const orderDetailSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Orders", // Reference to the Orders collection
  },

  st_code: {
    type: Number,
    required: true,
  },

  order_qty: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("OrderDetail", orderDetailSchema);
