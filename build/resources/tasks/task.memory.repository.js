import { notFoundError } from '../../constants';
export const tasks = [];
export const create = async (boardId, task) => {
    if (!tasks[boardId])
        throw new Error(notFoundError);
    tasks[boardId][task.id] = task;
    return tasks[boardId][task.id];
};
export const getAll = async (boardId) => tasks[boardId] || {};
export const updateById = async (boardId, taskId, task) => {
    if (!tasks[boardId]?.[taskId])
        throw new Error(notFoundError);
    tasks[boardId][taskId] = { ...tasks[boardId][taskId], ...task };
    return tasks[boardId][taskId];
};
export const getById = async (boardId, taskId) => {
    if (!tasks[boardId]?.[taskId])
        throw new Error(notFoundError);
    return tasks[boardId]?.[taskId];
};
export const deleteById = async (boardId, taskId) => {
    if (!tasks[boardId]?.[taskId])
        throw new Error(notFoundError);
    const deletedTask = tasks[boardId][taskId];
    delete tasks[boardId][taskId];
    return deletedTask;
};
export const removeUsersTasks = async (id) => {
    const allTasks = Object.values(tasks)
        .map(boardTasks => Object.values(boardTasks)).flat();
    allTasks.forEach((task) => {
        if (!(task.userId === id) || !tasks[task.boardId])
            return;
        tasks[task.boardId][task.id].userId = null;
    });
};
//# sourceMappingURL=task.memory.repository.js.map