const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (val) {
        return /[A-z|0-9]{4,}@(gmail)(.com|.lk)/.test(val);
      },
      message: (val) => "Invalid Email!",
    },
  },

  password: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (val) {
        return /[a-z0-9]{8}/.test(val);
      },
      message: (val) => "Invalid Password!",
    },
    // minLength: [8, "Password should be at least 8 characters"],
    // pattern: "^[a-z0-9]{8}$",
  },

  address: {
    type: String,
    required: true,
  },

  contact_no: {
    type: Number,
    required: true,
    unique: true,
    // validate: [(val) => val.length === 10, "Invalid Phone No"],
    validate: {
      validator: function (val) {
        return val.toString().length === 9;
      },
      // message: (val) => `${val.value} has to be 9 digits`,
      message: "Invalid Contact No!",
    },
  },

  user_role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
