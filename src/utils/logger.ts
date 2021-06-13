import {createLogger, transports, format} from 'winston';

const logger = createLogger({
  level: 'debug',
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.cli(),
      )
    }),
    new transports.File({
      filename: 'logs/error.log',
      format: format.json(),
      level: 'error',
    }),
  ],
  exitOnError: true,
});

export const log = (msg: string, meta?: object): void => {
  logger.debug(msg, meta);
};

export const errorLog = (errMsg: string, meta?: object): void => {
  logger.error(errMsg, meta);
};
