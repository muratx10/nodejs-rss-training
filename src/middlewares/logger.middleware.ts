import { Request, Response, NextFunction } from "express";
import { finished } from "stream";
import { log } from "../utils/logger";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {
    body,
    method,
    params,
    query,
    url,
  } = req;

  next();

  finished(res, () => {
    const {statusCode} = res;

    log(`${method}: ${url} ${statusCode}`, {
        body,
        method,
        params,
        query,
        statusCode,
        url,
      });
  });
};
