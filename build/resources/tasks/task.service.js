import Task from "./task.model";
import { create as createTask, deleteById as deleteTaskById, getAll as getAllTasks, getById as getTaskById, updateById as updateTaskById, } from './task.memory.repository';
export const create = async (boardId, body) => createTask(boardId, new Task({ ...body, boardId }));
export const deleteById = async (boardId, taskId) => deleteTaskById(boardId, taskId);
export const getAll = async (boardId) => Object.values(await getAllTasks(boardId));
export const getById = async (boardId, taskId) => getTaskById(boardId, taskId);
export const updateById = async (boardId, taskId, body) => updateTaskById(boardId, taskId, { ...body, boardId, id: taskId });
//# sourceMappingURL=task.service.js.map