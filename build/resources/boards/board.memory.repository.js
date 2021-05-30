import { notFoundError } from '../../constants';
import { tasks } from '../tasks/task.memory.repository';
import Board from './board.model';
export const boards = [
    new Board({ title: 'Board1' }),
    new Board({ title: 'Board2' }),
];
export const getAll = async () => boards;
export const getById = async (id) => {
    if (!boards[id])
        throw new Error(notFoundError);
    return boards[id];
};
export const create = async (board) => {
    boards[board.id] = board;
    tasks[board.id] = {};
    return boards[board.id];
};
export const updateById = async (id, data) => {
    if (!boards[id])
        throw new Error(notFoundError);
    boards[id] = { ...boards[id], ...data };
    return boards[id];
};
export const deleteById = async (id) => {
    if (!boards[id])
        throw new Error(notFoundError);
    const deletedBoard = boards[id];
    delete boards[id];
    delete tasks[id];
    return deletedBoard;
};
//# sourceMappingURL=board.memory.repository.js.map