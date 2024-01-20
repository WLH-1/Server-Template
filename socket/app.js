const MidConfig = require("./middleware/mid-config");
const Koa = require("koa");
const app = new Koa();

const IOStart = require("./socket/index");
const httpServer = require("http").createServer(app.callback());

const options = {};
let io = IOStart(httpServer, options);

const registerRouter = require("./api/index");
serverStart(app);

async function serverStart(app) {
  try {
    app.use(MidConfig());
    app.use(registerRouter(io));
  } catch (err) {
    console.log(err);
  }
}

let conn = httpServer.listen(3001, () => {
  console.log("access");
});

process.on("SIGINT", () => {
  conn.keepAliveTimeout = 1;
  console.log("Closing server...");
  conn.close(() => {
    console.log("Server closed !!!");
    process.exit();
  });
});

module.exports.io = io;
