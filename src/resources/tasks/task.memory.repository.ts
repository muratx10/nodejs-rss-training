import { ITask } from '../../types/interfaces';

const Task = require('src/resources/tasks/task.model');

let tasks = [
  new Task(),
];

const create = async (data: ITask): Promise<ITask> => {
  const task = new Task({...data});
  await tasks.push(task);

  return task;
};

const getAll = async (): Promise<ITask[]> => tasks;

const updateById = async (data: ITask): Promise<ITask> => {
  const { title, order, description, userId, boardId, columnId } = data;
  const taskIdx = tasks
    .findIndex(({id: taskId}) => taskId === data.id);
  const updatedTask = {
    ...tasks[taskIdx], title, order, description, userId, boardId, columnId
  };

  tasks.splice(taskIdx, 1, updatedTask);

  return updatedTask;
};

const getById = async (id: string): Promise<ITask> => tasks
  .find(({ id: taskId }) => taskId === id);

const deleteById = async (id: string): Promise<ITask> => {
  const deletedTask = getById(id);
  tasks = tasks.filter(({ id: taskId }) => taskId !== id);

  return deletedTask;
};

const deleteByBoardId = async (boardId: string): Promise<string> => {
  const tasksForSelectedBoard = tasks
    .filter(({boardId: id}) => id === boardId);

  await Promise.allSettled(tasksForSelectedBoard
    .map(({id}) => deleteById(id)));

  return 'Deleted';
};

const removeUsersTasks = async (id: string): Promise<string> => {
  const usersTasks = tasks.filter(({ userId }) => userId === id);
  await Promise.allSettled(usersTasks
    .map(({ id: taskId }) => updateById({
      id: taskId,
      userId: '',
    })));

  return 'Deleted';
};

module.exports = {
  create,
  deleteByBoardId,
  deleteById,
  getAll,
  getById,
  removeUsersTasks,
  updateById,
};
