const Key = require('../../configuration/env')()
const nestApi = Key.nestApi

const rp = require('request-promise')

module.exports = {
  demoAdd: async () => {
    //每周一早上六点删除工作台打印记录
    const options = {
      uri: `${nestApi}demo/add`,
      method: "GET",
      body: {},
      json: true, 
    };
    let res = await rp(options);
  },
};