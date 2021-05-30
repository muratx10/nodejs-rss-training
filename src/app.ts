import express, {Request, Response, NextFunction} from 'express';
import swaggerUI from 'swagger-ui-express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yamljs';
import boardRouter from './resources/boards/board.router.js';
import taskRouter from './resources/tasks/task.router.js';
import userRouter from './resources/users/user.router.js';
import { routes } from './constants';

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);

const app = express();
const swaggerDocument = YAML.load(path.join(dirName, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(routes.users, userRouter);
app.use(routes.boards, boardRouter);
app.use(routes.tasks, taskRouter);

export default app;
