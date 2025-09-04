const Router = require("koa-router");
const v1 = new Router({ prefix: "/cms" }); // 业务一级路由用复数
const Controllers = require("./controllers");

v1.get("/seoSetting", Controllers.getSeoSetting);
v1.post("/seoSetting", Controllers.setSeo);

v1.post("/article", Controllers.createArticle);
v1.put("/article/:id", Controllers.updateArticle);
v1.get("/article", Controllers.getArticles);
v1.post("/upload/image", Controllers.uploadImage);
v1.get("/generateHtml/:id", Controllers.generateHTML);


module.exports = [v1];