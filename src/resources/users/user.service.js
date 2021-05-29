const usersRepo = require('src/resources/users/user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
/**
 * @module UsersService
 */

/**
 * @memberOf module:UsersService
 * @param {IUser} data - User information
 * @return {Promise<IUserWithoutPassword>} created user
 */
const create = (data) => usersRepo.create(data);

/**
 * @memberOf module:UsersService
 * @param {string} id - ID of user
 * @return {Promise<IUserWithoutPassword>} deleted user
 */
const deleteById = (id) => {
  tasksRepo.removeUsersTasks(id);
  return usersRepo.deleteById(id);
};

/**
 * @memberOf module:UsersService
 * @return {Promise<IUser[]>}
 */
const getAll = () => usersRepo.getAll();

/**
 * @memberOf module:UsersService
 * @param {string} id - ID of user
 * @return {Promise<IUserWithoutPassword>}
 */
const getById = (id) => usersRepo.getById(id);

/**
 * @memberOf module:UsersService
 * @param {string} id - ID of user
 * @param {Partial<IUser>} data - Optional properties to update
 * @return {Promise<IUserWithoutPassword>} updated user
 */
const updateById = (id, data) => usersRepo.updateById(id, data);

module.exports = {
  create,
  deleteById,
  getAll,
  getById,
  updateById,
};
