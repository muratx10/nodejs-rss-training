/* eslint-disable no-console */
import logger from './logger';

export const exceptionHandler = (err: Error, origin: string): void => {
  const message = `${origin}: ${err.toString()}`;

  console.error(message);

  logger(message, 'error');
};

export const rejectionHandler = (reason: Error): void => {
  const message = `Unhandled rejection error: ${reason}`;

  console.error(message);

  logger(message, 'error');
};
