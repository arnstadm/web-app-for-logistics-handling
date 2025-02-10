// models/Company.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

let companySchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    users: {
      type: Array
    },
    items: {
      type: Array
    }
  },
  {
    collection: "company"
  }
);

userSchema.plugin(uniqueValidator, { message: "Company already registered" });
module.exports = mongoose.model("Company", companySchema);
