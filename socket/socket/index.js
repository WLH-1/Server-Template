let io = null;
const Key = require("../configuration/env")();
const rp = require("request-promise");
function IOStart(server, options) {
  io = require("socket.io")(server, options);
  io.on("connection", (socket) => {
    socket.on("getMsgRoom", async (data) => {
      console.log("啊，进来了");
      socket.join("msgRoom");
    });
  });

  return io;
}
module.exports = IOStart;
