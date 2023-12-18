const Services = require("./services");

module.exports = {
    sayHello: async (ctx) => {
        let res = await Services.sayHello();
        ctx.body = res;
    },
};