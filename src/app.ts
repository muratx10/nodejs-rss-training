import express, { NextFunction, Request, Response } from 'express';
import { finished } from 'stream';
import swaggerUI from 'swagger-ui-express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yamljs';
import boardRouter from './resources/boards/board.router.js';
import taskRouter from './resources/tasks/task.router.js';
import userRouter from './resources/users/user.router.js';
import { routes } from './constants';
import { exceptionHandler, rejectionHandler } from './utils/errHandlers';
import errHandleMiddleware from './middlewares/errHandler.middleware';
import loggerMiddleware from './middlewares/logger.middleware';

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);

const app = express();

process.on('uncaughtException', exceptionHandler);
process.on('unhandledRejection', rejectionHandler);

const swaggerDocument = YAML.load(path.join(dirName, '../doc/api.yaml'));

app
  .use(express.json())
  .use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
  .use('/', (req: Request, res: Response, next: NextFunction) =>
    req.originalUrl === '/'
      ? res.send('Service is running...')
      : next()
  )
  .use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    next();

    finished(res, () => {
      const ms = Date.now() - start;

      loggerMiddleware(req, res, next, ms);
    });
  })
  .use(errHandleMiddleware)
  .use(routes.users, userRouter)
  .use(routes.boards, boardRouter)
  .use(routes.tasks, taskRouter);

export default app;
