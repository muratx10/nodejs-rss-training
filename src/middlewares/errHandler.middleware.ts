import { Request, Response, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { errorLog } from "utils/logger";

export const errHandlerMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  errorLog(err.message, err);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
};
