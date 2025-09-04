// 控制层：
// 1.解析ctx 
//   [ctx.params]
//   [ctx.query]
//   [ctx.request.body]
// 2.调用 services
// 3.返回 ctx.body

const Services = require('./services')

module.exports = {
    uploadsCommNoLimit: async (ctx, next) => {
        let res = await Services.uploadsCommNoLimit(ctx, next)
        ctx.body = res
    },
    uploadsNoChangName: async (ctx, next) => {
        let res = await Services.uploadsNoChangName(ctx, next)
        ctx.body = res
    }
}