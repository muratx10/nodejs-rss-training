import express from 'express';
import { create, deleteById, getAll, getById, updateById } from './task.service';
const router = express.Router({ mergeParams: true });
router.route('/').post(async (req, res) => {
    try {
        const { body } = req;
        const { boardId } = req.params;
        if (!boardId)
            return;
        const task = await create(boardId, body);
        if (!task)
            return;
        res.status(201).json(task);
    }
    catch (e) {
        res.status(400).send({ message: e });
    }
});
router.route('/').get(async (req, res) => {
    try {
        const { params: { boardId } } = req;
        if (!boardId)
            return;
        const tasks = await getAll(boardId);
        res.status(200).json(tasks);
    }
    catch (e) {
        res.status(400).send({ message: e });
    }
});
router.route('/:taskId').put(async (req, res) => {
    try {
        const { body } = req;
        const { taskId, boardId } = req.params;
        if (!taskId || !boardId)
            return;
        const task = await updateById(boardId, taskId, body);
        if (!task)
            return;
        res.status(200).json(task);
    }
    catch (e) {
        res.status(404).send({ message: e });
    }
});
router.route('/:taskId').get(async (req, res) => {
    try {
        const { taskId, boardId } = req.params;
        if (!boardId || !taskId)
            return;
        const task = await getById(boardId, taskId);
        if (!task)
            return;
        res.status(200).json(task);
    }
    catch (e) {
        res.status(404).send({ message: e });
    }
});
router.route('/:taskId').delete(async (req, res) => {
    try {
        const { params: { taskId, boardId } } = req;
        if (!boardId || !taskId)
            return;
        const deletedTask = await deleteById(boardId, taskId);
        if (!deletedTask)
            return;
        res.status(204).json(deletedTask);
    }
    catch (e) {
        res.status(404).send({ message: e });
    }
});
export default router;
//# sourceMappingURL=task.router.js.map