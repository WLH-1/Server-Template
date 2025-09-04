const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = new mongoose.Schema({
  seoTitle: String,        // SEO 标题，显示在搜索引擎结果页标题
  seoDescription: String,  // SEO 描述，显示在搜索引擎结果页摘要
  seoKeywords: String,     // SEO 关键词，用逗号分隔
  createdAt: { type: Date, default: Date.now },
});

module.exports = Schema;