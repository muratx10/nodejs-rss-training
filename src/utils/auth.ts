import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { IUser } from "../interfaces/interfaces";
import { SALT, SECRET, TOKEN_EXPIRE_TIME } from "../config/config";

type JWTToken = {
  userId: string;
  login: string;
}

declare global{
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

export const verifyToken = async (token: string) => new Promise<JWTToken>((res, rej) => {
  jwt.verify(
    token.replace('Bearer ', ''),
    SECRET!,
    (err: VerifyErrors | null, decoded: JwtPayload | undefined) => {
    if (err || !decoded) {
      return rej();
    }

    return res(decoded as JWTToken);
  });
});

export const createSessionToken = async (data: JWTToken) =>
  jwt.sign(data, SECRET!, { expiresIn: TOKEN_EXPIRE_TIME });

export const encodePassword = (password: string): string =>
  bcrypt.hashSync(password, SALT);

export const comparePassword = async (password: string, passwordHash: string): Promise<boolean> =>
  bcrypt.compare(password, passwordHash);
