const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const create = (data) => usersRepo.create(data);
const getById = (id) => usersRepo.getById(id);
const updateById = (id, data) => usersRepo.updateById(id, data);
const deleteById = (id) => usersRepo.deleteById(id);

module.exports = { getAll, create, getById, updateById, deleteById };
