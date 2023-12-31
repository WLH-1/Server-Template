const Router = require("koa-router");
const v1 = new Router({ prefix: "/app/user" }); // 业务一级路由用复数
const Controllers = require("./controllers");

v1.get("/", Controllers.getUsers);
v1.get("/userInfo", Controllers.getUserInfo);
v1.post("/editUser/:id", Controllers.editUser);

module.exports = [v1];