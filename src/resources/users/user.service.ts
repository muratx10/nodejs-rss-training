import * as users from './user.repository';
import { IUser } from "../../interfaces/interfaces";
import { encodePassword } from "../../utils/auth";

export const create = async (user: IUser): Promise<IUser> => users.create(user);

export const getAll = async (): Promise<IUser[]> => users.getAll();

export const getById = async (id: string): Promise<IUser | undefined> => users.getById(id);

export const updateById = async (userId: string, data: Partial<IUser & { password?: string }>): Promise<IUser> => {
  const { password, ...userData } = data;

  if (password) userData.passwordHash = encodePassword(password);

  return users.update(userId, userData);
};

export const deleteById = async (id: string): Promise<boolean> => users.deleteById(id);

export const getByUsername = async (username: string): Promise<IUser | undefined> => users.getByUsername(username);
