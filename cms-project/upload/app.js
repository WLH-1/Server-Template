const Koa = require('koa')
const Key = require('./configuration/env')()
const MidConfig = require('./middleware/mid-config')
const registerRouter = require('./api/index')
const cors = require('@koa/cors');

//Http Server Start
const app = new Koa()
const port = Key.port
serverStart(app, port)

app.use(cors({
    origin: function (ctx) {
        return '*';
    },
    allowMethods: ['GET', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['Token', 'Server-Authorization'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Token'],
    maxAge: 5,
    credentials: true,
}))


async function serverStart(app, port) {
    try {
        app.use(MidConfig())
        app.use(registerRouter())
        app.listen(port, () => console.log(`👻  :Server is now listening for the requests at port: ${port} `))
    } catch (err) {
        console.log(err)
    }
}