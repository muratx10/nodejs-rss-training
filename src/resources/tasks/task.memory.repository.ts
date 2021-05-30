import Task, { ITask } from './task.model';

let tasks = [
  new Task(),
];

export const create = async (data: ITask): Promise<ITask> => {
  const task = new Task({...data});
  await tasks.push(task);

  return task;
};

export const getAll = async (): Promise<ITask[]> => tasks;

export const updateById = async (boardId: string, taskId: string, task: ITask): Promise<ITask> => {
  if (!tasks[boardId]?.[taskId]) {
    throw new Error('Task not found');
  }

  tasks[boardId]![taskId] = { ...tasks[boardId]![taskId], ...task };
  return tasks[boardId]![taskId];
};

export const getById = async (id: string): Promise<ITask | undefined> => tasks
  .find(({ id: taskId }) => taskId === id);

export const deleteById = async (id: string): Promise<ITask | undefined> => {
  const deletedTask = getById(id);
  tasks = tasks.filter(({ id: taskId }) => taskId !== id);

  return deletedTask;
};

export const deleteByBoardId = async (boardId: string): Promise<string> => {
  const tasksForSelectedBoard = tasks
    .filter(({boardId: id}) => id === boardId);

  await Promise.allSettled(tasksForSelectedBoard
    .map(({id}) => deleteById(id)));

  return 'Deleted';
};

export const removeUsersTasks = async (id: string): Promise<string> => {
  const allTasks = Object.values(tasks).map(boardTasks => Object.values(boardTasks)).flat();

  allTasks.forEach((task: ITask) => {
    if (!(task.userId === id) || !tasks[task.boardId]) return;

    tasks[task.boardId]![task.id]!.userId = null;
  });

  return 'Unassigned all tasks';
};
