const tasksRepo = require('./task.memory.repository');
/**
 * @module TasksService
 */

/**
 * @memberOf module:TasksService
 * @param {ITask} data - Task information
 * @return {Promise<ITask>} created task
 */
const create = async (data) => tasksRepo.create(data);

/**
 * @memberOf module:TasksService
 * @param {string} boardId - ID of board
 * @return {Promise<ITask>} deleted task
 */
const deleteByBoardId = async (boardId) => tasksRepo.deleteByBoardId(boardId);

/**
 * @memberOf module:TasksService
 * @param {string} id - ID of task
 * @return {Promise<ITask>} deleted task
 */
const deleteById = async (id) => tasksRepo.deleteById(id);

/**
 * @memberOf module:TasksService
 * @return {Promise<ITask[]>}
 */
const getAll = async () => tasksRepo.getAll();

/**
 * @memberOf module:TasksService
 * @param {string} id - ID of task
 * @return {Promise<ITask>} deleted task
 */
const getById = async (id) => tasksRepo.getById(id);

/**
 * @memberOf module:TasksService
 * @param {Partial<ITask>} data - Optional properties to update
 * @return {Promise<ITask>} updated task
 */
const updateById = async (data) => tasksRepo.updateById(data);

module.exports = {
  create,
  deleteByBoardId,
  deleteById,
  getAll,
  getById,
  updateById,
};
