import { Request, Response, NextFunction, RequestHandler } from 'express';

export const handleRequest = (handler: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await handler(req, res, next);
  } catch (e) {
    next(e);
  }
};
