import Board from "./board.model";
import { create as createBoard, deleteById as deleteBoardById, getAll as getAllBoards, getById as getBoardById, updateById as updateBoardById } from './board.memory.repository';
export const create = async (data) => createBoard(new Board(data));
export const deleteById = async (id) => deleteBoardById(id);
export const getAll = async () => Object.values(await getAllBoards());
export const getById = async (id) => getBoardById(id);
export const updateById = async (id, data) => updateBoardById(id, data);
//# sourceMappingURL=board.service.js.map