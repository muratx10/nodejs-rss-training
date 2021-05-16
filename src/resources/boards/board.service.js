const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const create = (data) => boardsRepo.create(data);
const deleteById = (id) => {
  tasksRepo.deleteByBoardId(id);
  return boardsRepo.deleteById(id);
};
const getAll = () => boardsRepo.getAll();
const getById = (id) => boardsRepo.getById(id);
const updateById = (id, data) => boardsRepo.updateById(id, data);

module.exports = {
  create,
  deleteById,
  getAll,
  getById,
  updateById,
};
