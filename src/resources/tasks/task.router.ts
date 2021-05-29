import {Request, Response} from 'express';
import { IRequestParams } from '../../types/interfaces';

const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');

router.route('/').post(async (req: Request<IRequestParams>, res: Response) => {
  const { params: { boardId } } = req;
  const task = await taskService.create({...req.body, boardId});

  res.type('application/json');
  res.statusCode = 201;
  res.json(task);
});

router.route('/').get(async (_req: Request<IRequestParams>, res: Response) => {
  const tasks = await taskService.getAll();

  res.json(tasks);
});

router.route('/:id').put(async (req: Request<IRequestParams>, res: Response) => {
  const { params: { id, boardId } } = req;
  const { body: { columnId, description, order, title, userId } } = req;
  const updatedTask = await taskService.updateById({
    boardId,
    columnId,
    description,
    id,
    order,
    title,
    userId,
  });

  if (!updatedTask) {
    res.status(404).send('Not found');
    return;
  }

  res.statusCode = 200;
  res.json(updatedTask);
});

router.route('/:id').get(async (req: Request<IRequestParams>, res: Response) => {
  const { params: { id } } = req;
  const task = await taskService.getById(id);

  if (!task) {
    res.status(404).send('Not found');
    return;
  }

  res.statusCode = 200;
  res.json(task);
});

router.route('/:id').delete(async (req: Request<IRequestParams>, res: Response) => {
  const { params: { id } } = req;
  const deletedTask = await taskService.deleteById(id);

  if (!deletedTask) {
    res.status(404).send('Not found');
    return;
  }

  res.statusCode = 204;
  res.json(deletedTask);
});

module.exports = router;
