const Task = require('./task.model');

/**
 * @module TasksRepo
 */

let tasks = [
  new Task(),
];

/**
 * @memberOf module:TasksRepo
 * @param {ITask} data - New task's data
 * @returns {Promise<ITask>}
 */
const create = async (data) => {
  const task = new Task({...data});
  await tasks.push(task);

  return task;
}

/**
 * @memberOf module:TasksRepo
 * @return {Promise<ITask[]>}
 */
const getAll = async () => tasks;

/**
 * @memberOf module:TasksRepo
 * @param {Partial<ITask>} data - Optional properties to update task
 * @returns {Promise<ITask>} updated task
 */
const updateById = async (data) => {
  const { title, order, description, userId, boardId, columnId } = data;
  const taskIdx = tasks
    .findIndex(({id: taskId}) => taskId === data.id);
  const updatedTask = {
    ...tasks[taskIdx], title, order, description, userId, boardId, columnId
  };

  tasks.splice(taskIdx, 1, updatedTask);

  return updatedTask;
};

/**
 * @memberOf module:TasksRepo
 * @param {string} id - ID of task
 * @return {Promise<ITask>}
 */
const getById = async (id) => tasks
  .find(({ id: taskId }) => taskId === id);

/**
 * @memberOf module:TasksRepo
 * @param {string} id - ID of task
 * @return {Promise<ITask>} deleted task
 */
const deleteById = async (id) => {
  const deletedTask = getById(id);
  tasks = tasks.filter(({ id: taskId }) => taskId !== id);

  return deletedTask;
};

/**
 * @memberOf module:TasksRepo
 * @param {string} boardId - ID of board
 * @return {Promise<string>}
 */
const deleteByBoardId = async (boardId) => {
  const tasksForSelectedBoard = tasks
    .filter(({boardId: id}) => id === boardId);

  await Promise.allSettled(tasksForSelectedBoard
    .map(({id}) => deleteById(id)));

  return 'Deleted';
};

/**
 * @memberOf module:TasksRepo
 * @param {string} id
 * @return {Promise<string>}
 */
const removeUsersTasks = async (id) => {
  const usersTasks = tasks.filter(({ userId }) => userId === id);
  await Promise.allSettled(usersTasks
    .map(({ id: taskId }) => updateById({
      id: taskId,
      userId: null,
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
