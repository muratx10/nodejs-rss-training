import User, { IUser } from "./user.model";
import {
  create as createUser,
  deleteById as deleteUserById,
  getAll as getAllUsers,
  getById as getUserById,
  updateById as updateUserById
} from './user.memory.repository';
import { removeUsersTasks } from '../tasks/task.memory.repository';

export const create = async (data: IUser): Promise<IUser> =>
  createUser(new User(data));

export const deleteById = async (id: string): Promise<IUser> => {
  removeUsersTasks(id);
  return deleteUserById(id);
};

export const getAll = async (): Promise<IUser[]> =>
  Object.values(await getAllUsers());

export const getById = async (id: string): Promise<IUser|undefined> =>
  getUserById(id);

export const updateById = async (id: string, data: IUser): Promise<IUser> =>
  updateUserById(id, data);
