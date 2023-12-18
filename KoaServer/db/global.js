const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema({
  // company: { type: ObjectId, ref: "Company" },
  tel: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = Schema;
