//正式
const secret = require("./secret");

module.exports = {
  port: 3001,
  jwtSecret: "cms-system",
  ebuyDBUrl: `mongodb+srv://${secret.pro_db_username}:${secret.pro_db_password_url}/cms?retryWrites=true&w=majority`,
};
