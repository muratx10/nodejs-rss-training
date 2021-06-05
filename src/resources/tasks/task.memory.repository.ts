import { ITask } from './task.model';
import { notFoundError } from '../../constants';

export const tasks: ITask[] = [

];

export const create = async (boardId: string, task: ITask): Promise<ITask> => {
  if (!tasks[boardId]) throw new Error(notFoundError);

  tasks[boardId]![task.id] = task;

  return tasks[boardId]![task.id];
};

export const getAll = async (boardId: string): Promise<ITask[]> => tasks[boardId] || {};

export const updateById = async (boardId: string, taskId: string, task: ITask): Promise<ITask> => {
  if (!tasks[boardId]?.[taskId]) throw new Error(notFoundError);

  tasks[boardId]![taskId] = { ...tasks[boardId]![taskId], ...task };

  return tasks[boardId]![taskId];
};

export const getById = async (boardId: string, taskId: string): Promise<ITask | undefined> => {
  if (!tasks[boardId]?.[taskId]) throw new Error(notFoundError);

  return tasks[boardId]?.[taskId];
};

export const deleteById = async (boardId: string, taskId: string): Promise<ITask | undefined> => {
  if (!tasks[boardId]?.[taskId]) throw new Error(notFoundError);

  const deletedTask = tasks[boardId]![taskId];
  delete tasks[boardId]![taskId];
  return deletedTask;
};

export const removeUsersTasks = async (id: string) => {
  const allTasks = Object.values(tasks)
    .map(boardTasks => Object.values(boardTasks)).flat();

  allTasks.forEach((task: ITask) => {
    if (!(task.userId === id) || !tasks[task.boardId]) return;

    tasks[task.boardId]![task.id]!.userId = null;
  });
};
