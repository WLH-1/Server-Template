const Koa = require('koa');
const Key = require("./configuration/env")();
const MidConfig = require("./middleware/mid-config");
const registerRouter = require("./api/index");
const redis = require("redis");


const app = new Koa();
const port = Key.port;

const DbConn = require("./db/DbConn");
let {
    Global,
    User,
    conn,
} = DbConn();

let client = redis.createClient(Key.redisOption.port, Key.redisOption.host);
client.on("error", function (err) {
    console.log("Error " + err);
});

module.exports = {
    client,
    Global,
    User,
    conn,
};

serverStart(app, port);
async function serverStart(app, port) {
    try {
        app.use(MidConfig());
        app.use(registerRouter());
        const appConn = app.listen(port, () =>
            console.log(
                `👻  :Server is now listening for the requests at port: ${port} `
            )
        );
        // 添加了一个信号监听器，以便在接收到中断信号时优雅地关闭服务器并结束进程。
        process.on('SIGINT', () => {
            appConn.keepAliveTimeout = 1
            console.log('Closing server...')
            appConn.close(() => {
                console.log('Server closed !!!')
                process.exit()
            })
        })
    } catch (err) {
        console.log(err);
    }
}