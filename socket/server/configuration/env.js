const pro = require("./pro");
const dev = require("./dev");
const dev_mys = require("./dev_mys");
const pro_mys = require("./pro_mys");

const env = process.env.NODE_ENV;

let exportConfig = null;
module.exports = () => {
  switch (env) {
    case "dev":
      exportConfig = dev;
      break;
    case "pro":
      exportConfig = pro;
      break;
    case "dev_mys":
      exportConfig = dev_mys;
      break;
    case "pro_mys":
      exportConfig = pro_mys;
      break;
  }
  return exportConfig;
};
