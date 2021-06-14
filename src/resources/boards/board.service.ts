import * as tasksService from '../tasks/task.service';
import { IBoard } from "../../interfaces/interfeces";
import * as DB from './board.repository';

export const getAll = async (): Promise<IBoard[]> => DB.getAll();

export const getById = async (id: string): Promise<IBoard | undefined> => DB.getById(id);

export const create = async (board: IBoard): Promise<IBoard> => DB.create(board);

export const updateById = async (
  id: string,
  board: Partial<IBoard>
): Promise<IBoard | undefined> => DB.update(id, board);

export const deleteById = async (id: string): Promise<IBoard | undefined> => {
  const deletedBoard = await DB.getById(id);
  const tasks = await tasksService.getAll(id);

  await Promise.all(tasks.map((task) => tasksService.deleteById(id, task.id)));
  await DB.deleteById(id);

  return deletedBoard;
};
