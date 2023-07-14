const mongoose = require("mongoose");
const validator = require("validator");

const stationerySchema = new mongoose.Schema({
  st_code: {
    type: Number,
    required: true,
    unique: true,
  },

  st_name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image_name: {
    type: String,
    // required: true,
  },

  image_url: {
    type: String,
    // required: true,
  },

  unit_price: {
    type: Number, // can store both integers and decimal numbers
    required: true,
  },

  qty_on_hand: {
    type: Number,
    required: true,
  },

  category_id: {
    type: Number,
    required: true,
  },

  // category: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Category",
  // },
  // category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

module.exports = mongoose.model("Stationery", stationerySchema);
