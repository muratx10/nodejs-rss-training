import { deleteByBoardId } from "../tasks/task.memory.repository";
import { create as createBoard, deleteById as deleteBoardById, getAll as getAllBoards, getById as getBoardById, updateById as updateBoardById } from './board.memory.repository';
export const create = async (data) => createBoard(data);
export const deleteById = async (id) => {
    await deleteByBoardId(id);
    return deleteBoardById(id);
};
export const getAll = async () => getAllBoards();
export const getById = async (id) => getBoardById(id);
export const updateById = async (id, data) => updateBoardById(id, data);
//# sourceMappingURL=board.service.js.map