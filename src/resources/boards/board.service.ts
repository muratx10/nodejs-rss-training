import { IBoard } from "./board.model";
import { deleteByBoardId } from "../tasks/task.memory.repository";
import {
  create as createBoard ,
  deleteById as deleteBoardById,
  getAll as getAllBoards,
  getById as getBoardById,
  updateById as updateBoardById
}  from './board.memory.repository';

export const create = async (data: IBoard) => createBoard(data);

export const deleteById = async (id: string) => {
  await deleteByBoardId(id);
  return deleteBoardById(id);
};

export const getAll = async () => getAllBoards();

export const getById = async (id: string) => getBoardById(id);

export const updateById = async (id: string, data: IBoard) => updateBoardById(id, data);
