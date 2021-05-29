import { IBoard } from '../../types/interfaces';

const boardsRepo = require('src/resources/boards/board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const create = (data: IBoard) => boardsRepo.create(data);

const deleteById = (id: string) => {
  tasksRepo.deleteByBoardId(id);
  return boardsRepo.deleteById(id);
};

const getAll = () => boardsRepo.getAll();

const getById = (id: string) => boardsRepo.getById(id);

const updateById = (id: string, data: IBoard) => boardsRepo.updateById(id, data);

module.exports = {
  create,
  deleteById,
  getAll,
  getById,
  updateById,
};
