const mongoose = require("mongoose");

let transaction = mongoose.Schema({
  username: String,
  type: String,
  amount: Number,
  currency: String,
  status: String,
  timestamp: Number,
});

module.exports = transaction = mongoose.model("transaction", transaction);
