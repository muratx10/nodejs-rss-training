const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getById = (id) => boardsRepo.getById(id);
const create = (data) => boardsRepo.create(data);
const updateById = (id, data) => boardsRepo.updateById(id, data);
const deleteById = (id) => boardsRepo.deleteById(id);

module.exports = {getAll, getById, create, updateById, deleteById};
