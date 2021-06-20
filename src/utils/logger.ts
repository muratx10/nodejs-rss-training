import {createLogger, transports, format} from 'winston';

const {colorize, cli, json, combine} = format;

const logger = createLogger({
  level: 'silly',
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        cli(),
      )
    }),
    new transports.File({
      filename: 'logs/error.log',
      format: json(),
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
