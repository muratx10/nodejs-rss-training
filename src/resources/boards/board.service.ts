import Board, { IBoard } from "./board.model";
import {
  create as createBoard ,
  deleteById as deleteBoardById,
  getAll as getAllBoards,
  getById as getBoardById,
  updateById as updateBoardById
}  from './board.memory.repository';

export const create = async (data: IBoard): Promise<IBoard> => createBoard(new Board(data));

export const deleteById = async (id: string): Promise<IBoard> => deleteBoardById(id);

export const getAll = async (): Promise<IBoard[]> => Object.values(await getAllBoards());

export const getById = async (id: string): Promise<IBoard> => getBoardById(id);
console.log(0);
export const updateById = async (id: string, data: IBoard): Promise<IBoard> => updateBoardById(id, data);
