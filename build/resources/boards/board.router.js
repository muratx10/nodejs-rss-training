import express from 'express';
import { create, deleteById, getAll, getById, updateById } from './board.service';
const router = express.Router();
router.route('/').get(async (_req, res) => {
    try {
        const boards = await getAll();
        res.json(boards);
    }
    catch (e) {
        res.status(400).send({ message: e });
    }
});
router.route('/:id').get(async (req, res) => {
    try {
        const { params: { id } } = req;
        const board = await getById(id);
        res.status(200).json(board);
        // res.statusCode = 200;
        // res.json(board);
    }
    catch (e) {
        res.status(404).send({ message: 'Not found' });
    }
});
router.route('/').post(async (req, res) => {
    try {
        const board = await create(req.body);
        res.status(201).json(board);
        // res.statusCode = 201;
        // res.json(board);
    }
    catch (e) {
        res.status(400).send({ message: e });
    }
});
router.route('/:id').put(async (req, res) => {
    try {
        const { body, params: { id } } = req;
        const updatedBoard = await updateById(id, body);
        res.status(200).json(updatedBoard);
        // res.statusCode = 200;
        // res.json(updatedBoard);
    }
    catch (e) {
        res.status(404).send({ message: 'Not found' });
    }
});
router.route('/:id').delete(async (req, res) => {
    try {
        const { params: { id } } = req;
        const deletedBoard = await deleteById(id);
        res.status(204).json(deletedBoard);
        // res.statusCode = 204;
        // res.json(deletedBoard);
    }
    catch (e) {
        res.status(404).send({ message: 'Not found' });
    }
});
export default router;
//# sourceMappingURL=board.router.js.map