import { ITask } from "./task.model";
import {
  create as createTask,
  deleteByBoardId as deleteTaskByBoardId,
  deleteById as deleteTaskById,
  getAll as getAllTasks,
  getById as getTaskById,
  updateById as updateTaskById,
} from './task.memory.repository';

export const create = async (data: ITask): Promise<ITask> => createTask(data);

export const deleteByBoardId = async (boardId: string): Promise<ITask | string> => deleteTaskByBoardId(boardId);

export const deleteById = async (id: string): Promise<ITask | undefined> => deleteTaskById(id);

export const getAll = async (): Promise<ITask[]> => getAllTasks();

export const getById = async (id: string): Promise<ITask | undefined> => getTaskById(id);

export const updateById = async (boardId: string, taskId: string, body: ITask): Promise<ITask> => updateTaskById(boardId, taskId, body);
