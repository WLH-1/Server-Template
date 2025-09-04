const compose = require('koa-compose')
const glob = require('glob')
const { resolve } = require('path')

registerRouter = (ctx) => {
    let routers = [];
    glob.sync(resolve(__dirname, './', '**/@(routes).js'))
        .map(file => {
            let router = require(file)
            router.map(version => {
                routers.push(version.routes())
                routers.push(version.allowedMethods())
            })
        })
    return compose(routers)
}

module.exports = registerRouter