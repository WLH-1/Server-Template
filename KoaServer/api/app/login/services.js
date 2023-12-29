const { createResponse } = require("../../../util/response.util");
const { getRedies, setRedies } = require("../../../util/redies.util");
const CryptoJS = require("crypto-js")
const { User } = require("../../../app")
const Key = require("../../../configuration/env")();
const Code = require("../../../util/code.util");
module.exports = {
    login: async (body) => {
        let { username, password } = body
        let ifExit = await User.findOne({ username })
        if (!ifExit) {
            return createResponse(
                Code.CONFLICT,
                "用户不已存在，请先注册"
            );
        }
        let psd = CryptoJS.HmacSHA256(password, Key.jwtSecret).toString()
        if (ifExit.password != psd) {
            return createResponse(
                Code.CONFLICT,
                "密码错误"
            );
        }
        return createResponse(
            Code.OK,
            "登录成功"
        );
    },
    register: async (body) => {
        let { username, password } = body
        let ifExit = await User.findOne({ username })
        if (ifExit) {
            return createResponse(
                Code.CONFLICT,
                "该用户已存在"
            );
        }
        let payload = {
            username,
            password: CryptoJS.HmacSHA256(password, Key.jwtSecret).toString()
        }
        let newUser = new User(payload)
        await newUser.save()
        return createResponse(
            Code.OK,
            "恭喜，注册成功"
        );
    },
};
