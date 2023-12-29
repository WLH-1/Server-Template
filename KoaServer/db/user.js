const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema({
    username: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = Schema;
