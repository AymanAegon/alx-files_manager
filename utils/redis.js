import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isReady = true;
    this.client.on('error', (err) => {
      console.log(err.message);
      this.isReady = false;
    });
    this.client.on('ready', (err) => {
      if (err) this.isReady = false;
      this.isReady = true;
    });
  }

  isAlive() {
    return this.isReady;
  }

  async get(str) {
    const value = await promisify(this.client.get).bind(this.client)(str);
    return value;
  }

  async set(key, value, duration) {
    try {
      await promisify(this.client.setex).bind(this.client)(key, duration, value);
    } catch (err) {
      console.log(err);
    }
  }

  async del(key) {
    await promisify(this.client.del).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
