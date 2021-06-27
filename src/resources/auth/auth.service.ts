import * as usersService from "resources/users/user.service";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { ErrorCode, IUser, JWTToken } from "../../interfaces/interfaces";
import { SALT, SECRET, TOKEN_EXPIRE_TIME } from "../../config/config";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
export const verifyToken = async (token: string) => new Promise<JWTToken>((res, rej) => {
  jwt.verify(
    token.replace("Bearer ", ""),
    SECRET!,
    (err: VerifyErrors | null, decoded: JwtPayload | undefined) => {
      if (err || !decoded) {
        return rej();
      }

      return res(decoded as JWTToken);
    });
});

export const encodePassword = (password: string): string =>
  bcrypt.hashSync(password, SALT);

export const comparePassword = async (password: string, passwordHash: string): Promise<boolean> =>
  bcrypt.compare(password, passwordHash);

export const createSessionToken = async (data: JWTToken) =>
  jwt.sign(data, SECRET!, { expiresIn: TOKEN_EXPIRE_TIME });

export const authenticate = async (login: string, password: string): Promise<IUser | ErrorCode> => {
  const user = await usersService.getByUsername(login);

  if (!user) return 'USER_NOT_FOUND';

  const passwordMatched = await comparePassword(password, user.passwordHash);

  if (!passwordMatched) return 'BAD_CREDENTIALS';

  return user;
};
