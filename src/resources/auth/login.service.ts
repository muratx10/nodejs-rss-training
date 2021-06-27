import * as usersService from 'resources/users/user.service';
import { comparePassword } from 'utils/auth';
import { IUser } from "../../interfaces/interfaces";

type ErrorCode = 'BAD_CREDENTIALS' | 'USER_NOT_FOUND'

export const authorizeUser = async (login: string, password: string): Promise<IUser | ErrorCode> => {
  const user = await usersService.getByUsername(login);

  if (!user) return 'USER_NOT_FOUND';

  const passwordMatched = await comparePassword(password, user.passwordHash);

  if (!passwordMatched) return 'BAD_CREDENTIALS';

  return user;
};
