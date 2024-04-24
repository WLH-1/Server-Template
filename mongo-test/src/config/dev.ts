export default {
  port: 3001,
  jwtSecret: 'nest-server',
  workDBUrl: 'mongodb+srv://admin:admin123@work.zlmrxot.mongodb.net/work?retryWrites=true&w=majority',
  redisOption: {
    host: '192.168.6.38',
    // host: '127.0.0.1',
    port: 6379,
  },
};
