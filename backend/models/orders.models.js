const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
    unique: true,
  },

  order_date: {
    type: Date,
    required: true,
  },

  order_cost: {
    type: Number, // can store both integers and decimal numbers
    required: true,
  },

  order_status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Orders", orderSchema);
