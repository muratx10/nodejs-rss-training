import { getConnection } from "typeorm";
import { IBoard } from "../../interfaces/interfaces";
import Board from "../../entities/board.entity";

export const getAll = async (): Promise<Array<IBoard>> => getConnection().getRepository(Board).find();

export const getById = async (boardId: string): Promise<IBoard | undefined> => getConnection().getRepository(Board).findOne(boardId);

export const create = async (board: IBoard): Promise<IBoard> => getConnection().getRepository(Board).save(board);

export const update = async (boardId: string, data: Partial<IBoard>): Promise<IBoard> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { columns, ...otherData } = data;

  await getConnection().getRepository(Board).update(boardId, otherData);

  const board = await getById(boardId);

  return board!;
};

export const deleteById = async (boardId: string): Promise<boolean> => {
  const res = await getConnection().getRepository(Board).delete(boardId);

  return !!res.affected;
};
