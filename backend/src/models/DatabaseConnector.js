import mysql from 'mysql2/promise';
import { DB_CONFIGS } from '../config/config.js';

class DatabaseConnector {
  constructor() {
    if (!DatabaseConnector.instance) {
      this.pool = mysql.createPool({
        host: DB_CONFIGS.HOST,
        user: DB_CONFIGS.USER,
        password: DB_CONFIGS.PASSWORD,
        database: DB_CONFIGS.DATABASE_NAME,
        connectionLimit: 10,
      });

      DatabaseConnector.instance = this;
    }

    return DatabaseConnector.instance;
  }

  async getConnection() {
    return this.pool.getConnection();
  }
}

// Getting my database connection
const dbConnector = new DatabaseConnector();
const connectorDb = await dbConnector.getConnection();

export default connectorDb;
