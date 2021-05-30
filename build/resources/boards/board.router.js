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
        if (!board)
            return;
        res.status(200).json(board);
    }
    catch (e) {
        res.status(404).send({ message: e });
    }
});
router.route('/').post(async (req, res) => {
    try {
        const board = await create(req.body);
        if (!board)
            return;
        res.status(201).json(board);
    }
    catch (e) {
        res.status(400).send({ message: e });
    }
});
router.route('/:id').put(async (req, res) => {
    try {
        const { params: { id } } = req;
        const updatedBoard = await updateById(id, req.body);
        if (!updatedBoard)
            return;
        res.status(200).json(updatedBoard);
    }
    catch (e) {
        res.status(404).send({ message: e });
    }
});
router.route('/:id').delete(async (req, res) => {
    try {
        const { params: { id } } = req;
        const deletedBoard = await deleteById(id);
        if (!deletedBoard)
            return;
        res.status(204).json(deletedBoard);
    }
    catch (e) {
        res.status(404).send({ message: e });
    }
});
export default router;
//# sourceMappingURL=board.router.js.map