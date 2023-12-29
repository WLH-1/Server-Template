const Router = require("koa-router");
const v1 = new Router({ prefix: "/app/Authorization" }); // 业务一级路由用复数
const Controllers = require("./controllers");

v1.post("/login", Controllers.login);
v1.post("/register", Controllers.register);
module.exports = [v1];