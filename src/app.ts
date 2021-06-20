import express, { NextFunction, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import path from "path";
import YAML from "yamljs";

import boardRouter from "./resources/boards/board.router";
import taskRouter from "./resources/tasks/task.router";
import userRouter from "./resources/users/user.router";

import { loggerMiddleware } from "./middlewares/logger.middleware";
import { errHandlerMiddleware } from "./middlewares/errHandler.middleware";
import { errorLog } from "./utils/logger";

import { routes } from "./constants";

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, "../doc/api.yaml"));

app
  .use(express.json())
  .use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
  .use("/", (req: Request, res: Response, next: NextFunction) =>
    req.originalUrl === "/"
      ? res.send("Service is running...")
      : next()
  )
  .use(loggerMiddleware)
  .use(routes.users, userRouter)
  .use(routes.boards, boardRouter)
  .use(routes.tasks, taskRouter)
  .use(errHandlerMiddleware);

process.on("uncaughtException", (err) => {
  errorLog(err.message, err);
});

process.on("unhandledRejection", ((reason, promise) => {
  promise.catch((err) => {
    errorLog(err.message, { reason, err });
  });
}));

export default app;
