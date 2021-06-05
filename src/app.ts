import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yamljs';
import boardRouter from './resources/boards/board.router.js';
import taskRouter from './resources/tasks/task.router.js';
import userRouter from './resources/users/user.router.js';
import { routes } from './constants';
import { exceptionHandler, rejectionHandler } from './utils/errHandlers';
import loggerMiddleware from './middlewares/logger.middleware';
import errHandleMiddleware from './middlewares/errHandler.middleware';

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
  .use(loggerMiddleware)
  .use(routes.users, userRouter)
  .use(routes.boards, boardRouter)
  .use(routes.tasks, taskRouter)
  .use(errHandleMiddleware);

export default app;
