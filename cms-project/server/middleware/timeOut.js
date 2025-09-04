const createError = require("http-errors");

module.exports = () => async (ctx, next) => {
  let timeOutList = [
    // {
    //   url: "/staffApp/order/printBills",
    //   delay: 3000,
    // },
  ];
  let delay = 5 * 60 * 1000;
  let ifExit = timeOutList.find((x) => x.url == ctx.url.split("?")[0]);
  if (ifExit) {
    delay = ifExit.delay;
  }

  const status = 504;
  const message = "请求超时，请稍后重试";
  const callback = function () { };
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      ctx.state.timeout = true;
      let error = new Error(message);
      error.code = status;
      reject(error);
      callback(ctx, delay);
    }, delay);
  });
  await Promise.race([timeout, next()]);
  clearTimeout(timer);
};
