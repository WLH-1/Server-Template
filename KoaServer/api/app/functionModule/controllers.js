const Services = require("./services");

module.exports = {
    sayHello: async (ctx) => {
        let res = await Services.sayHello();
        ctx.body = res;
    },
    setRedis: async (ctx) => {
        let res = await Services.setRedis();
        ctx.body = res;
    },
    getRedis: async (ctx) => {
        let res = await Services.getRedis();
        ctx.body = res;
    },
};