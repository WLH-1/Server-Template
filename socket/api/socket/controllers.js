var app = require("../../app");

module.exports = {
  sendLoginMsgToStaffApp: async (ctx) => {
    let staffId = ctx.request.body.staffId;
    let deviceId = ctx.request.body.deviceId;
    app.io.to("staff" + staffId).emit("newLogin", { deviceId });
    ctx.body = "success";
  },

  sendOrderProcessMsgToStaffApp: async (ctx) => {
    let departments = ctx.request.body.departments;
    app.io
      .to("orderProcessingRoom")
      .emit("orderProcessPending", { departments });
    ctx.body = "success";
  },

  sendOrderTotalToBigData: async (ctx) => {
    let orders = ctx.request.body.orders;
    app.io.to("bigDataRoom").emit("orderTotalAdding", { orders });
    ctx.body = "success";
  },

  sendNewWeight: async (ctx) => {
    let roomId = ctx.request.body.roomId;
    let value = ctx.request.body.value;
    app.io.to(`${roomId}Weight`).emit("newWeight", { value });
    ctx.body = "success";
  },

  test: async (ctx) => {
    app.io.to("manageNoticeRoom").emit("manageNoticeData", "test");

    ctx.body = "success";
  },
};
