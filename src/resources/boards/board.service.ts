import { IBoard } from "../../interfaces/interfaces";
import * as DB from './board.repository';

export const getAll = async (): Promise<IBoard[]> => DB.getAll();

export const getById = async (id: string): Promise<IBoard | undefined> => DB.getById(id);

export const create = async (board: IBoard): Promise<IBoard> => DB.create(board);

export const updateById = async (
  id: string,
  board: Partial<IBoard>
): Promise<IBoard | undefined> => DB.update(id, board);

export const deleteById = async (boardId: string): Promise<boolean> => DB.deleteById(boardId);
