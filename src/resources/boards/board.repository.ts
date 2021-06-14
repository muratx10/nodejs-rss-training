import { IBoard } from "../../interfaces/interfeces";
import { getDBConnection } from "../../db/psql";
import Board from "./board.model";

const DB = getDBConnection()!.getRepository(Board);

export const getAll = async (): Promise<Array<IBoard>> => DB.find();

export const getById = async (boardId: string): Promise<IBoard | undefined> => DB.findOne(boardId);

export const create = async (board: IBoard): Promise<IBoard> => DB.save(board);

export const update = async (boardId: string, data: Partial<IBoard>): Promise<IBoard> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { columns, ...otherData } = data;
  await DB.update(boardId, otherData);
  const board = await getById(boardId);
  return board!;
};

export const deleteById = async (boardId: string): Promise<boolean> => {
  const res = await DB.delete(boardId);
  return !!res.affected;
};
