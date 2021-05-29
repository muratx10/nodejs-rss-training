import { IUser } from '../../types/interfaces';

const usersRepo = require('src/resources/users/user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const create = (data: IUser) => usersRepo.create(data);

const deleteById = (id: string) => {
  tasksRepo.removeUsersTasks(id);
  return usersRepo.deleteById(id);
};

const getAll = () => usersRepo.getAll();

const getById = (id: string) => usersRepo.getById(id);

const updateById = (id: string, data: IUser) => usersRepo.updateById(id, data);

module.exports = {
  create,
  deleteById,
  getAll,
  getById,
  updateById,
};
