// models/User.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

let userSchema = new Schema(
  {
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    password: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    company_id: {
      type: Number
    },
    password: {
      type: String
    },
    created_on: {
      type: Date
    }
  },
  {
    collection: "users"
  }
);

userSchema.plugin(uniqueValidator, { message: "Email already in use." });
module.exports = mongoose.model("User", userSchema);
