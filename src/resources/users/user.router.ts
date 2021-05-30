import express, {Request, Response} from 'express';
import User from './user.model';
import { create, deleteById, getAll, getById, updateById } from './user.service';

const router = express.Router();

type ReqParams = {
  id: string,
};

router.route('/').get(async (_req: Request, res: Response) => {
  try {
    const users = await getAll();

    res.status(200).json(users.map(User.toResponse));
  } catch (e) {
    res.status(400).send({message: e});
  }
});

router.route('/').post(async (req: Request, res: Response) => {
  try {
    const user = await create(req.body);

    res.status(201).json(User.toResponse(user));
    // res.statusCode = 201;
    // res.json(User.toResponse(user));
  } catch (e) {
    res.status(404).send({message: 'Not found'});
  }
});

router.route('/:id').get(async (req: Request<ReqParams>, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getById(id);

    if (!user) return;

    res.statusCode = 200;
    res.json(User.toResponse(user));
  } catch (e) {
    res.status(404).send({message: 'Not found'});
  }
});

router.route('/:id').put(async (req: Request<ReqParams>, res: Response) => {
  try {
    const { body, params: { id } } = req;
    const updatedUser = await updateById(id, body);

    if (!updatedUser) return;

    res.status(200).json(User.toResponse(updatedUser));
    // res.statusCode = 200;
    // res.json(User.toResponse(updatedUser));
  } catch (e) {
    res.status(404).send({message: e});
  }
});

router.route('/:id').delete(async (req: Request<ReqParams>, res: Response) => {
  try {
    const { params: { id } } = req;
    const deletedUser = await deleteById(id);

    if (!deletedUser) return;

    res.status(204).json(User.toResponse(deletedUser));
    // res.statusCode = 204;
    // res.json(User.toResponse(deletedUser));
  } catch (e) {
    res.status(404).send({message: 'Not found'});
  }
});

export default router;
