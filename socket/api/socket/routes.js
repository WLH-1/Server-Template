// 路由接口
const Router = require('koa-router')
const v1 = new Router({ prefix: '/koa/v1/sockets' }) // 业务一级路由用复数
const Controllers = require('./controllers')

v1.post('/test', Controllers.test)

module.exports = [v1]