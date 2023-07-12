const mongoose = require("mongoose");
const validator = require("validator");

const orderDetailSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
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
