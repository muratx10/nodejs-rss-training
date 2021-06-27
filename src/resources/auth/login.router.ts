import { Router } from "express";
import { createSessionToken } from "utils/auth";
import { StatusCodes } from "http-status-codes";
import { handleRequest } from "../../utils/handleRequest";
import User from "../../entities/user.entity";

import * as loginService from "./login.service";

const router = Router();

router
  .route('/')
  .post(handleRequest(async (req, res) => {
    const { login, password } = req.body;
    const auth = await loginService.authorizeUser(login, password);

    if (typeof auth === 'string') {
      res
        .status(auth === 'USER_NOT_FOUND'
          ? StatusCodes.FORBIDDEN
          : StatusCodes.BAD_GATEWAY)
        .send();

      return;
    }

    const token = await createSessionToken({
      login: auth.login,
      userId: auth.id,
    });

    res.json({
      user: User.toResponse(auth),
      message: 'Authentication is successful.',
      token,
    });
  }));

export default router;
