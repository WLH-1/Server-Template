const schedule = require("node-schedule");
const NestDemo = require("./nestDemo");
const rule = new schedule.RecurrenceRule();
rule.second = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
module.exports = {
  processing: async () => {
    schedule.scheduleJob(rule, async () => {
      //每周一早上六点删除工作台打印记录
      await NestDemo.demoAdd();
    });
  },
};
