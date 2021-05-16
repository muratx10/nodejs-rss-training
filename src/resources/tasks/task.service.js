const tasksRepo = require('./task.memory.repository');

const create = (data) => tasksRepo.create(data);
const getAll = () => tasksRepo.getAll();
const updateById = (data) => tasksRepo.updateById(data);
const getById = (id) => tasksRepo.getById(id);
const deleteById = (id) => tasksRepo.deleteById(id);
const deleteByBoardId = (boardId) => tasksRepo.deleteByBoardId(boardId);

module.exports = { create, getAll, updateById, getById, deleteById, deleteByBoardId };
