let io = null;
const Key = require("../configuration/env")();
const rp = require("request-promise");
function IOStart(server, options) {
  io = require("socket.io")(server, options);
  io.on("connection", (socket) => {
    socket.on("LoginRoom", async (data) => {
      socket.join(data);
    });
    
    // 商品称重房间
    socket.on("jionGoodWeightRoom", (data) => {
      console.log(data,'jionGoodWeightRoom');
      socket.join(data);
    });

     // 离开商品称重房间
    socket.on("leaveGoodWeightRoom", (data) => {
      console.log(data,'leaveGoodWeightRoom');
      socket.leave(data);
    });

    socket.on("orderProcessing", async (data) => {
      socket.join("orderProcessingRoom");
    });

    socket.on("bigData", async (data) => {
      socket.join("bigDataRoom");
    });

    socket.on("deliveryCoordinate", async (data) => {
      let { userId, truckSequence, coordinates, deliverOn } = data;

      const coreApi = Key.coreApi;
      const options = {
        uri: `${coreApi}manage/delivery/coordinate`,
        method: "Post",
        body: { userId, truckSequence, coordinates, deliverOn },
        headers: { authorization: data.token },
        json: true,
      };
      let res = await rp(options);
      console.log(11111, data, res);
    });

    socket.on("manageNotice", async (data) => {
      socket.join(data.userId);
      socket.join("manageNoticeRoom");
      const coreApi = Key.coreApi;
      const options = {
        uri: `${coreApi}manage/priceRemind/notice`,
        method: "Get",
        body: {},
        headers: { authorization: data.token },
        json: true,
      };
      let res = await rp(options);

      io.to(data.userId).emit("manageNoticeData", res);
    });
  });

  return io;
}
module.exports = IOStart;
