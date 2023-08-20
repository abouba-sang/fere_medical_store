import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

export const DB_CONFIGS = {
  HOST: DB_HOST,
  USER: DB_USER,
  DATABASE_NAME: DB_DATABASE,
  PASSWORD: DB_PASSWORD,
};

export const { NODE_ENVIRONNEMENT, SERVER_PORT, JWT_SECRET } = process.env;
