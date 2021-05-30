import Task from './task.model';
let tasks = [
    new Task(),
];
export const create = async (data) => {
    const task = new Task({ ...data });
    await tasks.push(task);
    return task;
};
export const getAll = async () => tasks;
export const updateById = async (boardId, taskId, task) => {
    if (!tasks[boardId]?.[taskId]) {
        throw new Error('Task not found');
    }
    tasks[boardId][taskId] = { ...tasks[boardId][taskId], ...task };
    return tasks[boardId][taskId];
};
export const getById = async (id) => tasks
    .find(({ id: taskId }) => taskId === id);
export const deleteById = async (id) => {
    const deletedTask = getById(id);
    tasks = tasks.filter(({ id: taskId }) => taskId !== id);
    return deletedTask;
};
export const deleteByBoardId = async (boardId) => {
    const tasksForSelectedBoard = tasks
        .filter(({ boardId: id }) => id === boardId);
    await Promise.allSettled(tasksForSelectedBoard
        .map(({ id }) => deleteById(id)));
    return 'Deleted';
};
export const removeUsersTasks = async (id) => {
    const allTasks = Object.values(tasks).map(boardTasks => Object.values(boardTasks)).flat();
    allTasks.forEach((task) => {
        if (!(task.userId === id) || !tasks[task.boardId])
            return;
        tasks[task.boardId][task.id].userId = null;
    });
    return 'Unassigned all tasks';
};
//# sourceMappingURL=task.memory.repository.js.map