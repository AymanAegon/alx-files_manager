import { redisClient } from '../utils/redis';
import { dbClient } from '../utils/db';

class AppController {
  static getStatus(req, res) {
    res.json({ "redis": redisClient.isAlive(), "db": dbClient.isAlive() });
  }

  static getStats(req, res) {
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()])
      .then(([users, files]) => res.json({ "users": users, "files": files }));
  }
}

module.exports = AppController;
