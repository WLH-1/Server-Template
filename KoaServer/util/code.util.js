const { } = require("../app");

module.exports = code = {
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  PROCESSING: 102,
  EARLYHINTS: 103,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  AMBIGUOUS: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  REQUESTED_RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  I_AM_A_TEAPOT: 418,
  MISDIRECTED: 421,
  UNPROCESSABLE_ENTITY: 422,
  FAILED_DEPENDENCY: 424,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,

  // 生成特定需求code 
  // createItemCode: async () => {
  //   let originStr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   let itemCode = "";
  //   for (let i = 0; i < 8; i++) {
  //     let index = Math.floor(Math.random() * 36);
  //     itemCode += originStr.substring(index - 1, index);
  //   }
  //   const ifExit = await DepositOrderItem.findOne({ itemCode });
  //   if (ifExit) {
  //     itemCode = await code.createItemCode();
  //   }

  //   return itemCode;
  // },

  createHexCode: (num) => {
    let str = num.toString(16).toLocaleUpperCase();
    let strPre = "000000";
    str = strPre.slice(0, 6 - str.length) + str;
    return str;
  },
  createTenCode: (num) => {
    let str = num.toString(10);
    let strPre = "000000";
    str = strPre.slice(0, 6 - str.length) + str;
    return str;
  },
};
