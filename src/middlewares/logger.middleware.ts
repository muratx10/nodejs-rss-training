import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
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

    const msg = `Incoming request: [${method}] for [${url}] params=${params};` +
      `query=${query}; body=${body}. Response with status code: ${statusCode}`;

    logger(msg, 'general');
  });

  next();
};

export default loggerMiddleware;
