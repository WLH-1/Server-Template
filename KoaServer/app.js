const Koa = require('koa');
const Key = require("./configuration/env")();
const MidConfig = require("./middleware/mid-config");
const registerRouter = require("./api/index");

const app = new Koa();
const port = Key.port;

const DbConn = require("./db/DbConn");
let {
    Global,
    conn,
} = DbConn();


module.exports = {
    Global,
    conn,
};

serverStart(app, port);
async function serverStart(app, port) {
    try {
        app.use(MidConfig());
        app.use(registerRouter());
        app.listen(port, () =>
            console.log(
                `👻  :Server is now listening for the requests at port: ${port} `
            )
        );
    } catch (err) {
        console.log(err);
    }
}