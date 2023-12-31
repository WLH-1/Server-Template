const { createResponse } = require("../../../util/response.util");
const { getRedies, setRedies } = require("../../../util/redies.util");
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const { User } = require("../../../app")
const Key = require("../../../configuration/env")();
const Code = require("../../../util/code.util");
module.exports = {
    editUser: async (id, body) => {
        let { tel, name, age } = body
        let ifExit = await User.findById(id)
        if (!ifExit) {
            return createResponse(
                Code.CONFLICT,
                "该用户不存在"
            );
        }
        let payload = {
            tel,
            name,
            age
        }
        await User.updateOne(
            { _id: id },
            { ...payload })
        return createResponse(
            Code.OK,
            "编辑用户成功"
        );
    },
    getUsers: async (user) => {
        let users = await User.find().lean()
        return createResponse(
            Code.OK,
            "查询用户列表成功",
            { data: users }
        );
    },
    getUserInfo: async (user) => {
        let ifExit = await User.findById(user.id)
        if (!ifExit) {
            return createResponse(
                Code.CONFLICT,
                "该用户不存在"
            );
        }
        return createResponse(
            Code.OK,
            "查询用户成功",
            ifExit
        );
    },
};
