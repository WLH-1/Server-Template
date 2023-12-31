const compose = require("koa-compose");
const jwt = require('jsonwebtoken');
const chalk = require("chalk");
const Key = require("../configuration/env")();

// token解码
function jwtAuth(ctx, next) {
  if (ctx.request.url == '/app/Authorization/login') {
    return next();
  }
  let token = ctx.header.authorization;
  if (!token) {
    ctx.throw(401, 'Authorization error');
  }
  token = token.replace('Bearer ', '');
  try {
    const { username, tel, name, id } = jwt.verify(token, Key.jwtSecret); // 验证token
    ctx.state.user = { username, tel, name, id }; // 将用户信息添加到state中
  } catch (err) {
    ctx.throw(401, 'Authorization error');
  }
  return next();
}

//Logger
// 这个函数可以用于在某些场景中对字符串进行转义，以避免特殊字符引起的问题。在你的代码中，它被用来对查询字符串中的特殊字符进行转义，确保查询字符串不会影响到后续的处理逻辑。
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

  let ip = ctx.request.headers["x-forwarded-for"] ||
    ctx.request.headers["x-real-ip"] ||
    ctx.request.ip;

  let forward = ctx.request.headers["forwardip"]

  let info = {
    status: ctx.status,
    method: ctx.method,
    url: ctx.url,
    query: ctx.query,
    cost: s,
  };
  let { status, method, url, cost, query } = info;

  if (query.search) {
    ctx.query = escAddFun(query.search);
  }

  console.log(
    `[${
      status < 300 ? chalk.green(status) : chalk.red(status)
    }] [${chalk.yellow(method)}] ${chalk.cyan(url)} (${chalk.gray(cost)}) ${ip} ${forward || ''}`
  );
}

async function searchChange(ctx, next) {
  if (ctx.query.search) {
    // 字符转义
    ctx.query.search = escAddFun(ctx.query.search);
  }
  await next();
}


//Parsing the Body
const bodyParser = require("koa-bodyparser");

//Handling CORS
const cors = require("koa2-cors");

module.exports = () => {
  return compose([
    jwtAuth,
    logger,
    searchChange,
    bodyParser(),
    cors(),
  ]);
};
