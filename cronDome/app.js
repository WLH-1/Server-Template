const Koa = require('koa')
const Key = require('./configuration/env')()
const MidConfig = require('./middleware/mid-config')
// const registerRouter  = require('./api/index')


const app = new Koa()
const port = Key.port
serverStart(app, port)

async function serverStart(app, port) {
    try {
        app.use(MidConfig())
        //    app.use(registerRouter())
        const conn = app.listen(port, () => console.log(`👻  :Server is now listening for the requests at port: ${port} `))

        process.on('SIGINT', () => {
            conn.keepAliveTimeout = 1
            console.log('Closing server...')
            conn.close(() => {
                console.log('Server closed !!!')
                process.exit()
            })
        })
    } catch (err) {
        console.log(err)
    }
}

//开启定时任务
const infrastructure = require('./infrastructure/cron')
infrastructure.processing()
