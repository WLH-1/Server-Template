const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema({
    username: String,
    password: String,
    tel: String,
    name: String,
    age: Number,
    createdAt: { type: Date, default: Date.now },
});

module.exports = Schema;
