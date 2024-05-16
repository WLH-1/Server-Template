const pro = require("./pro");
const dev = require("./dev");

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
  }
  return exportConfig;
};
