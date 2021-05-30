import { create as createTask, deleteByBoardId as deleteTaskByBoardId, deleteById as deleteTaskById, getAll as getAllTasks, getById as getTaskById, updateById as updateTaskById, } from './task.memory.repository';
export const create = async (data) => createTask(data);
export const deleteByBoardId = async (boardId) => deleteTaskByBoardId(boardId);
export const deleteById = async (id) => deleteTaskById(id);
export const getAll = async () => getAllTasks();
export const getById = async (id) => getTaskById(id);
export const updateById = async (boardId, taskId, body) => updateTaskById(boardId, taskId, body);
//# sourceMappingURL=task.service.js.map