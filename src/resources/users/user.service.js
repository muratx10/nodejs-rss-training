const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const create = (data) => usersRepo.create(data);
const deleteById = (id) => {
  tasksRepo.removeUsersTasks(id);
  return usersRepo.deleteById(id);
};
const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getById(id);
const updateById = (id, data) => usersRepo.updateById(id, data);

module.exports = {
  create,
  deleteById,
  getAll,
  getById,
  updateById,
};
