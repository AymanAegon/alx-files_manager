import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    const client = createClient();
    client.on('error', (err) => console.log(err));
    return client;
  }

  isAlive() {
    this.on('ready', (err) => {
      if (err) return false;
      return true;
    });
  }

  async get(str) {
    const value = await promisify(this.get).bind(this)(str);
    return value;
  }

  async set(key, value, duration) {
    try {
      await promisify(this.setex).bind(this)(key, duration, value);
    } catch (err) {
      console.log(err);
    }
  }

  async del(key) {
    await promisify(this.del).bind(this)(key);
  }
}

const redisClient = RedisClient();
module.exports = redisClient;
