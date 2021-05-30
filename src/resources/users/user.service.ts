import { IUser } from "./user.model";
import {
  create as createUser,
  deleteById as deleteUserById,
  getAll as getAllUsers,
  getById as getUserById,
  updateById as updateUserById
} from './user.memory.repository';
import { removeUsersTasks } from '../tasks/task.memory.repository';

export const create = (data: IUser) => createUser(data);

export const deleteById = (id: string) => {
  removeUsersTasks(id);
  return deleteUserById(id);
};

export const getAll = () => getAllUsers();

export const getById = (id: string): Promise<IUser|undefined> => getUserById(id);

export const updateById = (id: string, data: IUser) => updateUserById(id, data);
