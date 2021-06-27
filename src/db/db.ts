import config from 'config/orm.config';
import { getConnection, createConnection, Connection } from 'typeorm';
/* eslint-disable no-console */

export const connectToDB = async (): Promise<void> => {
  let connection: Connection | null = null;

  try {
    connection = getConnection();
  } catch (error) {
    console.log('Connection does not exist: ', error.message);
  }

  try {
    if (connection) {
      if (!connection.isConnected) await connection.connect();
    } else {
      connection = await createConnection(config);
    }
    await connection.runMigrations();
    console.log('DB has connected');
  } catch (error) {
    console.error(error);
  }
};

export const tryDBConnect = async (cb: () => void): Promise<void> => {
  await connectToDB();
  cb();
};
