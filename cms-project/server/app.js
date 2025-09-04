const Koa = require("koa");
const Key = require("./configuration/env")();
const MidConfig = require("./middleware/mid-config");
const registerRouter = require("./api/index");
const serve = require("koa-static");
const koaBody = require('koa-body').default;
const path = require('path');

//需要生成的时候，使用 `.nextId()` 方法
//Http Server Start
const app = new Koa();
const port = Key.port;

const ebuyDbConn = require("./db/ebuyDbConn");
let {
  Article,
  SeoSetting,
  conn: ebuyConn,
} = ebuyDbConn();


module.exports = {
  Article,
  SeoSetting,
  ebuyConn,
};

serverStart(app, port);
async function serverStart(app, port) {
  try {
    app.use(serve(path.join(__dirname, "/static"))); // 这里先挂载静态目录
    // 让 public 文件夹可直接访问
    app.use(serve(path.join(__dirname, "public")));
    
    app.use(koaBody({
      multipart: true,
      formidable: {
        uploadDir: path.join(__dirname, '/static/picture'), // 临时目录
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024, // 10MB
      }
    }));
    app.use(MidConfig());
    app.use(registerRouter());
    const conn = app.listen(port, () =>
      console.log(
        `👻  :Server is now listening for the requests at port: ${port} `
      )
    );
    conn.timeout = 5 * 60 * 1000;
    process.on("SIGINT", () => {
      conn.keepAliveTimeout = 1;
      console.log("Closing server...");
      conn.close(() => {
        console.log("Server closed !!!");
        process.exit();
      });
    });
  } catch (err) {
    console.log(err);
  }
}
