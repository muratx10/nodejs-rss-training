import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  ms: number
): void => {
  res.on('close', () => {
    const { statusCode } = res;
    const {
      url,
      body: reqBody,
      method,
      params: reqParams,
      query: reqQuery
    } = req;

    const query = JSON.stringify(reqQuery);
    const params = JSON.stringify(reqParams);
    const body = JSON.stringify(reqBody);

    const msg =
      `Method: ${method}\n` +
      `URL: ${url}\n` +
      `Params: ${params}\n` +
      `Query: ${query}\n` +
      `Body: ${body}\n` +
      `Status code: ${statusCode}\n` +
      `Time: ${ms}ms\n` +
      `\n--------------------------------------------------------------------\n`;

    logger(msg, 'log');
  });

  next();
};

export default loggerMiddleware;
