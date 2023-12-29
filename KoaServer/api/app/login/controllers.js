const Services = require("./services");

module.exports = {
    login: async (ctx) => {
        let body = ctx.request.body
        let res = await Services.login(body);
        ctx.body = res;
    },
    register: async (ctx) => {
        let body = ctx.request.body
        let res = await Services.register(body);
        ctx.body = res;
    },
};