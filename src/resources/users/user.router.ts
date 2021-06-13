import {Router} from 'express';
import {StatusCodes, ReasonPhrases} from 'http-status-codes';
import {handleRequest} from '../../utils/handleRequest';
import User from './user.model';
import * as usersService from './user.service';

const router = Router();

router
  .route('/')
  .get(handleRequest(async (_req, res) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
  }))
  .post(handleRequest(async (req, res) => {
    const user = await usersService.create(new User(req.body));

    if (!user) res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    else res.status(StatusCodes.CREATED).json(User.toResponse(user));
  }));

router
  .route('/:userId')
  .get(handleRequest(async (req, res) => {
    const {params: {userId}} = req;
    const user = await usersService.getById(userId!);

    if (!user) res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    else res.status(StatusCodes.OK).json(User.toResponse(user));

  }))
  .put(handleRequest(async (req, res) => {
    const {params: {userId}, body} = req;
    const updatedUser = await usersService.updateById(userId!, body);

    if (!updatedUser) res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    else res.status(StatusCodes.OK).json(User.toResponse(updatedUser));
  }))
  .delete(handleRequest(async (req, res) => {
    const {params: {userId}} = req;
    const deletedUser = await usersService.deleteById(userId!);

    if (!deletedUser) res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    else res.status(StatusCodes.NO_CONTENT).json(User.toResponse(deletedUser));
  }));

export default router;
