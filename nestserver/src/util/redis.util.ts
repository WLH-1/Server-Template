import Redis from 'ioredis';
import Key from 'src/config/env';

const redisIndex = []; // 用于记录 redis 实例索引
const redisList = []; // 用于存储 redis 实例

export class myRedisUtil {
  static async myInitRedis(method: string, db = 0) {
    const isExist = redisIndex.some((x) => x === db);
    if (!isExist) {
      // Logger.debug(`[Redis ${db}]来自 ${method} 方法调用 `);
      redisList[db] = new Redis({ ...Key.redisOption, db });
      redisIndex.push(db);
    } else {
      // Logger.debug(`[Redis ${db}]来自 ${method} 方法调用`);
    }
    return redisList[db];
  }

  async mySetRedis(method: string, db = 0, key: string, val) {
    if (typeof val == 'object') {
      val = JSON.stringify(val);
    }
    const redis = await myRedisUtil.myInitRedis(method, db);
    return await new Promise((resolve, reject) => {
      redis.set(`${key}`, val, (err, val) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(val);
      });
    });
  }

  async myGetRedis(method: string, db = 0, key: string) {
    return new Promise(async (resolve, reject) => {
      const redis = await myRedisUtil.myInitRedis(method, db);
      redis.get(`${key}`, (err, val) => {
        if (err) {
          console.log(err);

          reject(err);
          return;
        }
        resolve(val);
      });
    });
  }

  async myDeleteRedies(method: string, db = 0, key: string) {
    return new Promise(async (resolve, reject) => {
      const redis = await myRedisUtil.myInitRedis(method, db);
      redis.del(`${key}`, (err, val) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(val);
      });
    });
  }
}
