import User, { IUser } from './user.model';
import { notFoundError } from '../../constants';

const users = [
  new User({name: 'User1'}),
  new User({name: 'User2'}),
];

export const getAll = async (): Promise<IUser[]> => users;

export const getById = async (id: string): Promise<IUser|undefined> => {
  if (!users[id]) throw new Error(notFoundError);

  return users[id];
};

export const create = async (user: IUser): Promise<IUser> => {
  users[user.id] = user;

  return users[user.id];
};

export const updateById = async (id: string, data: IUser): Promise<IUser> => {
  if (!users[id]) throw new Error(notFoundError);

  users[id] = { ...users[id], ...data };

  return users[id];
};

export const deleteById = async (id: string): Promise<User> => {
  if (!users[id]) throw new Error(notFoundError);

  const deletedUser = users[id];

  delete users[id];

  return deletedUser;
};
