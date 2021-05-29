import {Request, Response} from 'express';
import { IRequestParams } from '../../types/interfaces';

const router = require('express').Router();
const User = require('src/resources/users/user.model');
const usersService = require('src/resources/users/user.service');

router.route('/').get(async (_req: Request, res: Response) => {
  const users = await usersService.getAll();

  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req: Request, res: Response) => {
  const user = await usersService.create(req.body);

  res.statusCode = 201;
  res.json(User.toResponse(user));
});

router.route('/:id').get(async (req: Request<IRequestParams>, res: Response) => {
  const { id } = req.params;
  const user = await usersService.getById(id);

  if (!user) {
    res.status(404).send('User not found');
    return;
  }

  res.statusCode = 200;
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req: Request<IRequestParams>, res: Response) => {
  const { body, params: { id } } = req;
  const updatedUser = await usersService.updateById(id, body);

  if (!updatedUser) {
    res.status(404).send('User not found');
    return;
  }

  res.statusCode = 200;
  res.json(User.toResponse(updatedUser));
});

router.route('/:id').delete(async (req: Request<IRequestParams>, res: Response) => {
  const { params: { id } } = req;
  const deletedUser = await usersService.deleteById(id);

  if (!deletedUser) {
    res.status(404).send('User not found');
    return;
  }

  res.statusCode = 204;
  res.json(User.toResponse(deletedUser));
});

module.exports = router;
