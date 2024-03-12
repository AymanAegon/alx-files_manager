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
    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
