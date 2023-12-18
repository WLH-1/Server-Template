const { createResponse } = require("../../../util/response.util");
const Code = require("../../../util/code.util");
module.exports = {
    sayHello: async () => {
        return createResponse(
            Code.OK,
            "Hello Word!"
        );
    },
};
