import * as boardsService from '../boards/board.service';
import * as tasksService from '../tasks/task.service';
import users from './user.memory.repository';
import { IUser } from './user.model';

export const create = async (user: IUser): Promise<IUser> => users.create(user.id, user);

export const getAll = async (): Promise<IUser[]> => users.getAll();

export const getById = async (id: string): Promise<IUser | undefined> => users.getById(id);

export const updateById = async (id: string, user: Partial<IUser>): Promise<IUser> => users.update(id, user);

export const deleteById = async (id: string): Promise<IUser | undefined> => {
  const deletedUser = await users.deleteById(id);

  const boards = await boardsService.getAll();
  const tasks = (await Promise.all(boards.map((board) => tasksService.getAll(board.id)))).flat();

  const updateTasks = tasks.filter((task) => task.userId === id);

  await Promise.all(updateTasks.map((task) => tasksService
    .updateById(task.boardId, task.id, { userId: null })));

  return deletedUser;
};
