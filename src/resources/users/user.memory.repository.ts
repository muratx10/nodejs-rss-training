import User, { IUser } from './user.model';

let users = [
  new User({name: 'User1'}),
  new User({name: 'User2'}),
];

export const getAll = async (): Promise<IUser[]> => users;

export const getById = async (id: string): Promise<IUser|undefined> => users
  .find(({ id: userId }) => userId === id);

export const create = async (data: IUser): Promise<IUser> => {
  const user = new User({...data});
  await users.push(user);

  return user;
};

export const updateById = async (id: string, data: IUser): Promise<IUser|undefined> => {
  let updatedUser;

  users.forEach((user, idx) => {
    if (user.id !== id) return;

    users[idx] = { ...users[idx],...data };
    updatedUser = users[idx];
  });

  return updatedUser;
};

export const deleteById = async (id: string): Promise<User | undefined> => {
  const deletedUser = getById(id);
  users = users.filter(({id: userId}) => userId !== id);

  return deletedUser;
};
