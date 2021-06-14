import * as users from './user.repository';
import { IUser } from "../../interfaces/interfeces";

export const create = async (user: IUser): Promise<IUser> => users.create(user);

export const getAll = async (): Promise<IUser[]> => users.getAll();

export const getById = async (id: string): Promise<IUser | undefined> => users.getById(id);

export const updateById = async (id: string, user: Partial<IUser>): Promise<IUser> => users.update(id, user);

export const deleteById = async (id: string): Promise<boolean> => users.deleteById(id)
;
