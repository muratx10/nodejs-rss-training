import logger from './logger';

export const exceptionHandler = (err: Error, origin: string): void => {
  const message = `${origin}: ${err.toString()}`;

  logger(message, 'error');
};

export const rejectionHandler = (reason: Error): void => {
  const message = `Unhandled rejection error: ${reason}`;

  logger(message, 'error');
};
