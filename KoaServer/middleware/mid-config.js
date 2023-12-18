const compose = require("koa-compose");
const chalk = require("chalk");

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
  let { status, method, url, cost, query } = info;

  if (query.search) {
    ctx.query = escAddFun(query.search);
  }

  console.log(
    `[${
      status < 300 ? chalk.green(status) : chalk.red(status)
    }] [${chalk.yellow(method)}] ${chalk.cyan(url)} (${chalk.gray(cost)})`
  );
}

async function searchChange(ctx, next) {
  if (ctx.query.search) {
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
    logger,
    searchChange,
    bodyParser(),
    cors(),
  ]);
};
