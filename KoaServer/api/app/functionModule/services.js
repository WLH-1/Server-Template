const { createResponse } = require("../../../util/response.util");
const { getRedies, setRedies } = require("../../../util/redies.util");
const Code = require("../../../util/code.util");
module.exports = {
    sayHello: async () => {
        return createResponse(
            Code.OK,
            "Hello Word!"
        );
    },
    setRedis: async () => {
        let data = ['1', '2', '3', '4']
        await setRedies("data", JSON.stringify(data));
        return createResponse(
            Code.OK,
            "setRedis成功"
        );
    },
    getRedis: async () => {
        const newData = await getRedies("data");
        return createResponse(
            Code.OK,
            "getRedis成功",
            { data: JSON.parse(newData)}
        );
    },
};
