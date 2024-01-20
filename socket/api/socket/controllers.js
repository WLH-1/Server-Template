var app = require("../../app");

module.exports = {

  test: async (ctx) => {
    let body = ctx.request.body;
    console.log(body);
    app.io.to("msgRoom").emit("newMsg", 123);
    ctx.body = "success";
  },
};
