const Services = require("./services");

module.exports = {
  // 查询默认seo
  getSeoSetting: async (ctx) => {
    let res = await Services.getSeoSetting();
    ctx.body = res;
  },
  // 配置默认seo
  setSeo: async (ctx) => {
    let body = ctx.request.body;
    let res = await Services.setSeo(body);
    ctx.body = res;
  },

  // 创建新文章
  createArticle: async (ctx) => {
    let body = ctx.request.body;
    let res = await Services.createArticle(body);
    ctx.body = res;
  },

  // 编辑文章
  updateArticle: async (ctx) => {
    let body = ctx.request.body;
    let { id } = ctx.params;
    let res = await Services.updateArticle(body,id);
    ctx.body = res;
  },

  // 拉取文章
  getArticles: async (ctx) => {
    let query = ctx.query;
    let res = await Services.getArticles(query);
    ctx.body = res;
  },

  uploadImage: async (ctx) => {
    const file = ctx.request.files.file; // 这里要跟 formData 的 key 对应
    let res = await Services.uploadImage(file);
    ctx.body = res;
  },
  generateHTML: async (ctx) => {
    let { id } = ctx.params;
    let res = await Services.generateHTML(id);
    ctx.body = res;
  },
};
