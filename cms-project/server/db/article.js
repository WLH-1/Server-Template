const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = new mongoose.Schema({
  title: String,           // 文章标题，显示在列表和页面上
  content: String,         // 文章内容（HTML/富文本）
  category: String,        // 文章分类，可以用来过滤或分组
  status: String,          // 文章状态，如 'draft'（草稿）、'published'（已发布）等
  slug: String,            // 文章 URL 别名，用于 SEO 友好的链接，如 example.com/slug
  excerpt: String,         // 摘要或预览内容，一般用于列表页显示
  tags: [String],          // 标签数组，用于文章归类或搜索
  seoTitle: String,        // SEO 标题，显示在搜索引擎结果页标题
  seoDescription: String,  // SEO 描述，显示在搜索引擎结果页摘要
  seoKeywords: String,     // SEO 关键词，用逗号分隔
  wordCount: Number,       // 文章字数统计
  createdAt: { type: Date, default: Date.now },  // 创建时间，默认当前时间
  updatedAt: Date,         // 更新时间，每次编辑可更新
  publishedAt: Date        // 发布时间，文章正式发布的时间
});

module.exports = Schema;