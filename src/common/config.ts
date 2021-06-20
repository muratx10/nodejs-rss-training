import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const {
  AUTH_MODE,
  DB_HOST,
  JWT_SECRET_KEY,
  NODE_ENV,
  PORT,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} = process.env;

export const POSTGRES_PORT = Number(process.env['POSTGRES_PORT']);

export {
  AUTH_MODE,
  DB_HOST,
  JWT_SECRET_KEY,
  NODE_ENV,
  PORT,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER
};
