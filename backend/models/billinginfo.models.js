const mongoose = require("mongoose");
const validator = require("validator");

const billingInfoSchema = new mongoose.Schema({
  billing_id: {
    type: Number,
    required: true,
    unique: true,
  },

  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  province: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  street_address: {
    type: String,
    required: true,
  },

  zip_code: {
    type: String,
    required: true,
  },

  phone_no: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (val) {
        return val.toString().length === 9;
      },
      message: "Invalid Contact No!",
    },
  },

  card_payment: {
    type: Boolean,
    required: true,
  },

  cash_on_delivery: {
    type: Boolean,
    required: true,
  },

  billing_status: {
    type: String,
    required: true,
  },

  coupon_price: {
    type: Number,
    required: true,
  },

  order_id: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("BiilingDetails", billingInfoSchema);
