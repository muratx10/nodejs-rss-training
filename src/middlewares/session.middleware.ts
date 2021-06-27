import { Request, Response, NextFunction } from "express";
import * as userService from "resources/users/user.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { verifyToken } from "../utils/auth";

const sessionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const sessionToken = req.headers.authorization;

  if (!sessionToken) {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);

    return;
  }

  try {
    const token = await verifyToken(sessionToken);
    const user = await userService.getById(token.userId);

    if (!user) {
      res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);

      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
  }
};

export default sessionMiddleware;
