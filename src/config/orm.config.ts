import { ConnectionOptions } from 'typeorm';
import {
  DB_TYPE,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} from './config';

const config: ConnectionOptions = {
  name: 'default',
  type: DB_TYPE,
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: ['./src/entities/**/*.ts'],
  migrations: ['./src/migration/*.ts'],
  cli: {
    migrationsDir: './src/migration',
  },
};

export default config;
