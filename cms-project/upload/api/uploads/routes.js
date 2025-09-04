// 路由接口
const Router = require('koa-router')
const v1 = new Router({ prefix: '/v1/uploads' }) // 业务一级路由用复数
const Controllers = require('./controllers')

v1.post('/uploadsCommNoLimit', Controllers.uploadsCommNoLimit)
v1.post('/uploadsNoChangName', Controllers.uploadsNoChangName)

module.exports = [v1]