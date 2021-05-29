import {v4 as uuid} from 'uuid';
import { IUser } from '../../types/interfaces';

class User implements IUser{
  public login: string;

  public id: string;

  public name: string;

  public password: string;

  constructor({
    id = uuid(),
    login = 'user',
    name = 'USER',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.login = login;
    this.name = name;
    this.password = password;
  }

  static toResponse(user: IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
