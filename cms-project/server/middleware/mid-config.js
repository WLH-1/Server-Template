const compose = require("koa-compose");
const chalk = require("chalk");
const Key = require("../configuration/env")();
const rp = require("request-promise");
const timeOut = require("./timeOut");

//Logger
let escAddFun = (value) => {
  let valueSplit = value.split("");
  let valueSplitIndex = [];

  let containSpecial = RegExp(
    /[(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\)(\?)(\)]+/
  );
  for (var i = 0; i < valueSplit.length; i++) {
    if (containSpecial.test(value[i])) {
      valueSplitIndex.push("\\" + valueSplit[i]);
    } else {
      valueSplitIndex.push(valueSplit[i]);
    }
  }

  let newValue = valueSplitIndex.join("");
  return newValue;
};

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

  let forward = ctx.request.headers["forwardip"]
  let { status, method, url, cost, query } = info;

  if (query.search) {
    ctx.query = escAddFun(query.search);
  }

  console.log(
    `[${status < 300 ? chalk.green(status) : chalk.red(status)
    }] [${chalk.yellow(method)}] ${chalk.cyan(url)} (${chalk.gray(cost)}) ${ip} ${forward || ''}`
  );
}

async function searchChange(ctx, next) {
  if (ctx.query.search) {
    ctx.query.search = escAddFun(ctx.query.search);
  }
  await next();
}

async function versionCheck(ctx, next) {
  let headers = ctx.headers;
  if (
    headers &&
    headers["type"] &&
    headers["version"] &&
    headers["ischeckversion"] == "true"
  ) {
    let type = headers["type"]; //web  app appH5 staff staffH5
    let version = headers["version"];
    const options = {
      uri: `${Key.coreUrl}/hot/api/update/newestVersion`,
      method: "GET",
      qs: { type },
      json: true,
    };

    let res = await rp(options);
    if (res.version !== Number(version)) {
      let err = new Error("PRECONDITION_FAILED");
      err.code = 412;
      err.version = res;
      throw err;
    }
  }
  await next();
}
//Handling Error
async function errorHandling(ctx, next) {
  try {
    await next();
  } catch (err) {
    let { code, message, etc, version } = err;
    ctx.status = code || 500;
    let payload = {
      error: message || "Internal Server Error",
    };
    console.log('errorUrl:', ctx.request.url);
    console.log(err);
    if (version) {
      payload.error = { ...version };
    }
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
  return compose([
    cors(),
    logger,
    errorHandling,
    versionCheck,
    searchChange,
    bodyParser(),
    timeOut(),
  ]);
};
