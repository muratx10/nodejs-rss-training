import express, {Request, Response} from 'express';
import { create, deleteById, getAll, getById, updateById } from './task.service';

const router = express.Router({ mergeParams: true });

type ReqParams = {
  id: string,
}

type BoardParams = {
  boardId: string,
  taskId?: string
}

router.route('/').post(async (req: Request<BoardParams>, res: Response) => {
  try {
    const { params: { boardId } } = req;
    const task = await create({...req.body, boardId});

    res.status(201).json(task);

    // res.type('application/json');
    // res.statusCode = 201;
    // res.json(task);
  } catch (e) {
    res.status(400).send({message: e});
  }
});

router.route('/').get(async (_req: Request, res: Response) => {
  try {
    const tasks = await getAll();

    res.json(tasks);
  } catch (e) {
    res.status(400).send({message: e});
  }
});

router.route('/:taskId').put(async (req: Request<BoardParams>, res: Response) => {
  // const { params: { id, boardId } } = req;
  // const { body: { columnId, description, order, title, userId } } = req;
  // const updatedTask = await taskService.updateById({
  //   boardId,
  //   columnId,
  //   description,
  //   id,
  //   order,
  //   title,
  //   userId,
  // });
  try {
    const { taskId, boardId } = req.params;

    if (!taskId || !boardId) return;

    const updatedTask = await updateById(boardId, taskId, req.body);

    if (!updatedTask) return;

    res.status(200).json(updatedTask);
  } catch (e) {
    res.status(404).send({message: 'Not found'});
  }
});

router.route('/:id').get(async (req: Request<ReqParams>, res: Response) => {
    try {
      const { params: { id } } = req;
      const task = await getById(id);

      if (!task) return;

      res.status(200).json(task);
    } catch (e) {
      res.status(404).send({message: 'Not found'});
    }
});

router.route('/:id').delete(async (req: Request<ReqParams>, res: Response) => {
  try {
    const { params: { id } } = req;
    const deletedTask = await deleteById(id);

    if (!deletedTask) return;

    res.status(204).json(deletedTask);
  } catch (e) {
    res.status(404).send({message: 'Not found'});
  }
});

export default router;
