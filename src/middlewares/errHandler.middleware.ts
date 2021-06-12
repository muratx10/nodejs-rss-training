import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

const errHandleMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logger(err.toString(), 'error');

  res.status(500).end('Internal Server Error');
};

export default errHandleMiddleware;
