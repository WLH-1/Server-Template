const Services = require("./services");

module.exports = {
    editUser: async (ctx) => {
        let body = ctx.request.body
        let { id } = ctx.params
        let res = await Services.editUser(id,body);
        ctx.body = res;
    },
    getUsers: async (ctx) => {
        let res = await Services.getUsers();
        ctx.body = res;
    },
    getUserInfo: async (ctx) => {
        let user = ctx.state.user;
        let res = await Services.getUserInfo(user);
        ctx.body = res;
    },
};