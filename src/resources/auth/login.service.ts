import * as usersService from "resources/users/user.service";
import { comparePassword } from "utils/auth";
import { ErrorCode, IUser } from "../../interfaces/interfaces";

export const authorizeUser = async (login: string, password: string): Promise<IUser | ErrorCode> => {
  const user = await usersService.getByUsername(login);

  if (!user) return 'USER_NOT_FOUND';

  const passwordMatched = await comparePassword(password, user.passwordHash);

  if (!passwordMatched) return 'BAD_CREDENTIALS';

  return user;
};
