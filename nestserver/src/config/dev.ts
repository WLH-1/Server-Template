export default {
  port: 3001,
  jwtSecret: 'nest-server',
  ebuyDBUrl:
    'mongodb://192.168.6.38:27018,192.168.6.38:27019,192.168.6.38:27020/ir',
  redisOption: {
    host: '192.168.6.38',
    // host: '127.0.0.1',
    port: 6379,
  },
};
