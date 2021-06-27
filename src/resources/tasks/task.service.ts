import * as tasks from "./task.repository";
import { ITask } from "../../interfaces/interfaces";

export const create = (task: ITask): Promise<ITask | undefined> => tasks.create(task);

export const getAll = (boardId: string): Promise<ITask[]> => tasks.getAll(boardId);

export const getById = (boardId: string, taskId: string): Promise<ITask | undefined> => tasks.getById(boardId, taskId);

export const updateById = (boardId: string, taskId: string, task: Partial<ITask>): Promise<ITask> => tasks
  .update(boardId, taskId, task);

export const deleteById = (taskId: string): Promise<boolean> => tasks.deleteById(taskId);
