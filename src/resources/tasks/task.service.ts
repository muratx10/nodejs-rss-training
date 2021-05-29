import { ITask } from '../../types/interfaces';

const tasksRepo = require('src/resources/tasks/task.memory.repository');

const create = async (data: ITask): Promise<ITask> => tasksRepo.create(data);

const deleteByBoardId = async (boardId: string): Promise<ITask> => tasksRepo.deleteByBoardId(boardId);

const deleteById = async (id: string): Promise<ITask> => tasksRepo.deleteById(id);

const getAll = async (): Promise<ITask[]> => tasksRepo.getAll();

const getById = async (id: string): Promise<ITask> => tasksRepo.getById(id);

const updateById = async (data: ITask): Promise<ITask> => tasksRepo.updateById(data);

module.exports = {
  create,
  deleteByBoardId,
  deleteById,
  getAll,
  getById,
  updateById,
};
