import { Request, Response } from 'express';
import logger from '../utils/logger';

const errHandleMiddleware = (
  err: Error,
  _req: Request,
  res: Response
): void => {
  logger(err.toString(), 'error');

  res.status(500).end('Service temporarily unavailable');
};

export default errHandleMiddleware;
