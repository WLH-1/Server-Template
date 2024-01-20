var app = require("../../app");

module.exports = {

  test: async (ctx) => {
    let body = ctx.request.body;
    app.io.to("msgRoom").emit("newMsg", body);
    ctx.body = "success";
  },
};
