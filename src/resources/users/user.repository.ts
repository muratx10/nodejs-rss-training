import { IUser } from "interfaces/interfeces";
import { getConnection } from "typeorm";
import User from "../../entities/user.entity";

export const create = async (user: IUser) => getConnection().getRepository(User).save(user);

export const getAll = async () => getConnection().getRepository(User).find();

export const getById = async (userId: string) => getConnection().getRepository(User).findOne(userId);

export const update = async (userId: string, data: Partial<IUser>) => {
  await getConnection().getRepository(User).update(userId, data);

  const user = await getById(userId);

  return user!;
};

export const deleteById = async (userId: string) => {
  const res = await getConnection().getRepository(User).delete(userId);
  return !!res.affected;
};
