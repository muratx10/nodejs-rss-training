const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

/**
 * @module BoardsService
 */

/**
 * @memberOf module:BoardsService
 * @param {IBoard} data - Board information
 * @return {Promise<IBoard>} created board
 */
const create = (data) => boardsRepo.create(data);

/**
 * @memberOf module:BoardsService
 * @param {string} id - ID of board
 * @return {Promise<IBoard>} deleted board
 */
const deleteById = (id) => {
  tasksRepo.deleteByBoardId(id);
  return boardsRepo.deleteById(id);
};

/**
 * @memberOf module:BoardsService
 * @return {Promise<IBoard[]>}
 */
const getAll = () => boardsRepo.getAll();

/**
 * @memberOf module:BoardsService
 * @param {string} id - ID of boars
 * @return {Promise<IBoard>}
 */
const getById = (id) => boardsRepo.getById(id);

/**
 * @memberOf module:BoardsService
 * @param {string} id - ID of board
 * @param {Partial<IBoard>} data - Optional properties to update
 * @return {Promise<IBoard>} updated board
 */
const updateById = (id, data) => boardsRepo.updateById(id, data);

module.exports = {
  create,
  deleteById,
  getAll,
  getById,
  updateById,
};
