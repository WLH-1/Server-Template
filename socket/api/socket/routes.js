// 路由接口
const Router = require('koa-router')
const v1 = new Router({ prefix: '/api/v1/sockets' }) // 业务一级路由用复数
const Controllers = require('./controllers')

v1.post('/sendLoginMsgToStaffApp', Controllers.sendLoginMsgToStaffApp)
v1.post('/sendOrderProcessMsgToStaffApp', Controllers.sendOrderProcessMsgToStaffApp)
v1.post('/sendOrderTotalToBigData', Controllers.sendOrderTotalToBigData)
v1.post('/sendNewWeight', Controllers.sendNewWeight)
v1.get('/test', Controllers.test)

module.exports = [v1]