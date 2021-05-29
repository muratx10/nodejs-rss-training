import {Request, Response} from 'express';
import { IRequestParams } from '../../types/interfaces';

const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (_req: Request, res: Response) => {
  const boards = await boardsService.getAll();

  res.json(boards);
});

router.route('/:id').get(async (req: Request<IRequestParams>, res: Response) => {
  const { params: { id } } = req;
  const board = await boardsService.getById(id);

  if (!board) {
    res.status(404).send('Board not found');
    return;
  }

  res.statusCode = 200;
  res.json(board);
});

router.route('/').post(async (req: Request, res: Response) => {
  const board = await boardsService.create(req.body);

  res.statusCode = 201;
  res.json(board);
});

router.route('/:id').put(async (req: Request<IRequestParams>, res: Response) => {
  const { body, params: { id } } = req;
  const updatedBoard = await boardsService.updateById(id, body);

  if (!updatedBoard) {
    res.status(404).send('Board not found');
    return;
  }

  res.statusCode = 200;
  res.json(updatedBoard);
});

router.route('/:id').delete(async (req: Request<IRequestParams>, res: Response) => {
  const { params: { id } } = req;
  const deletedBoard = await boardsService.deleteById(id);

  if (!deletedBoard) {

    res.status(404).send('Board not found');
    return;
  }

  res.statusCode = 204;
  res.json(deletedBoard);
});

module.exports = router;
