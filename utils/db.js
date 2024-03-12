import { MongoClient } from 'mongodb';

let { DB_DATABASE } = process.env;
if (!DB_DATABASE) DB_DATABASE = 'files_manager';

class DBClient {
  constructor() {
    let host = process.env.DB_HOST;
    if (!host) host = 'localhost';
    let port = process.env.DB_PORT;
    if (!port) port = '27017';
    const url = `mongodb://${host}:${port}/${DB_DATABASE}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    try {
      this.client.connect();
      this.db = this.client.db(DB_DATABASE);
      this.isReady = true;
    } catch (error) {
      this.isReady = false;
    }
  }

  isAlive() {
    return this.isReady;
  }

  async nbUsers() {
    const c = await this.db.collection('users').countDocuments();
    return c;
  }

  async nbFiles() {
    const c = await this.db.collection('files').countDocuments();
    return c;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
