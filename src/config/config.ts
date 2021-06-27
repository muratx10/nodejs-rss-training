import dotenv from 'dotenv';

import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

type DBType = 'mysql' | 'postgres' | 'mssql' | 'oracle' | 'mongodb';

export interface ProcessEnv {
  PORT: number;
  NODE_ENV: string;
  JWT_SECRET_KEY: string;
  AUTH_MODE: string;
  LOG_FOLDER: string;

  DB_TYPE: DBType;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  SECRET: string;
}

declare const process: {
  env: ProcessEnv;
};

export const {
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  LOG_FOLDER,
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  SECRET,
} = process.env;

export const AUTH_MODE = process.env.AUTH_MODE === 'true';
