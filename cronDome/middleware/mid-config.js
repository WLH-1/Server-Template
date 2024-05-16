const compose = require("koa-compose");
const chalk = require("chalk");
//Logger
async function logger(ctx, next) {
  const start = Date.now();
  await next();
  const s = (Date.now() - start) / 1000 + "s";
  let info = {
    status: ctx.status,
    method: ctx.method,
    url: ctx.url,
    query: ctx.query,
    cost: s,
  };
  let ip =
    ctx.request.headers["x-forwarded-for"] ||
    ctx.request.headers["x-real-ip"] ||
    ctx.request.ip;

  let forward = ctx.request.headers["forwardip"];
  let { status, method, url, cost, query } = info; 

  if (query.search) {
    ctx.query = escAddFun(query.search);
  }

  console.log(
    `[${
      status < 300 ? chalk.green(status) : chalk.red(status)
    }] [${chalk.yellow(method)}] ${chalk.cyan(url)} (${chalk.gray(
      cost
    )}) ${ip} ${forward || ""}`
  );
}

//Handling Error
async function errorHandling(ctx, next) {
  try {
    await next();
  } catch (err) {
    console.log(err);
    let { code, message, etc } = err;
    ctx.status = code || 500;
    let payload = {
      error: message || "Internal Server Error",
    };
    if (etc) {
      payload["details"] = etc;
    }
    ctx.body = payload;
  }
}

//Parsing the Body
const bodyParser = require("koa-bodyparser");

//Handling CORS
const cors = require("koa2-cors");

module.exports = () => {
  return compose([logger, errorHandling, bodyParser(), cors()]);
};
