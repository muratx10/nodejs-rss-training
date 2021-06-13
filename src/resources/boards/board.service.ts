import * as tasksService from '../tasks/task.service';
import boards from './board.memory.repository';
import {IBoard} from './board.model';

export const getAll = async (): Promise<IBoard[]> => boards.getAll();

export const getById = async (id: string): Promise<IBoard | undefined> => boards.getById(id);

export const create = async (board: IBoard): Promise<IBoard> => boards.create(board.id, board);

export const updateById = async (id: string, board: Partial<IBoard>): Promise<IBoard | undefined> => boards.update(id, board);

export const deleteById = async (id: string): Promise<IBoard | undefined> => {
  const deletedBoard = await boards.getById(id);
  const tasks = await tasksService.getAll(id);

  await Promise.all(tasks.map((task) => tasksService.deleteById(id, task.id)));
  await boards.deleteById(id);

  return deletedBoard;
};
