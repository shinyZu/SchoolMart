const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = new mongoose.Schema({
  category_code: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (val) {
        return /(CTG-000)[0-9]/.test(val);
      },
      message: (val) => "Invalid Category Code!",
    },
  },

  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
