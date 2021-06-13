import tasks from './task.memory.repository';
import { ITask } from './task.model';

export const create = (boardId: string, task: ITask): Promise<ITask | undefined> => tasks
  .create(boardId, task.id, task);

export const getAll = (boardId: string): Promise<ITask[]> => tasks.getAll(boardId);

export const getById = (boardId: string, taskId: string): Promise<ITask | undefined> => tasks.getById(boardId, taskId);

export const updateById = (boardId: string, taskId: string, task: Partial<ITask>): Promise<ITask> => tasks
  .update(boardId, taskId, task);

export const deleteById = (boardId: string, taskId: string): Promise<ITask | undefined> => tasks
  .deleteById(boardId, taskId);
