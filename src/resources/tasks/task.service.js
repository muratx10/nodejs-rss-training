const tasksRepo = require('./task.memory.repository');

const create = (data) => tasksRepo.create(data);
const deleteByBoardId = (boardId) => tasksRepo.deleteByBoardId(boardId);
const deleteById = (id) => tasksRepo.deleteById(id);
const getAll = () => tasksRepo.getAll();
const getById = (id) => tasksRepo.getById(id);
const updateById = (data) => tasksRepo.updateById(data);

module.exports = {
  create,
  deleteByBoardId,
  deleteById,
  getAll,
  getById,
  updateById,
};
