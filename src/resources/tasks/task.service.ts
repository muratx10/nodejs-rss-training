import Task, { ITask } from "./task.model";
import {
  create as createTask,
  deleteById as deleteTaskById,
  getAll as getAllTasks,
  getById as getTaskById,
  updateById as updateTaskById,
} from './task.memory.repository';

export const create = async (boardId: string, body: ITask): Promise<ITask> =>
  createTask(boardId, new Task({ ...body, boardId }));

export const deleteById = async (boardId: string, taskId: string): Promise<ITask | undefined> =>
  deleteTaskById(boardId, taskId);

export const getAll = async (boardId: string): Promise<ITask[]> =>
  Object.values(await getAllTasks(boardId));

export const getById = async (boardId: string, taskId: string): Promise<ITask | undefined> =>
  getTaskById(boardId, taskId);

export const updateById = async (boardId: string, taskId: string, body: ITask): Promise<ITask> =>
  updateTaskById(boardId, taskId, { ...body, boardId, id: taskId });
