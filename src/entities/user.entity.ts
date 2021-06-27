import { v4 as uuid } from "uuid";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser, IUserResponse } from "../interfaces/interfaces";
import { encodePassword } from "../utils/auth";

@Entity()
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  public login: string;

  @Column({length: 255})
  public id: string;

  @Column({length: 255})
  public name: string;

  @Column({length: 255})
  public passwordHash: string;

  constructor({
    id = uuid(),
    login = 'user',
    name = 'USER',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.login = login;
    this.name = name;
    this.passwordHash = encodePassword(password);
  }

  static toResponse(user: IUser): IUserResponse {
    const { id, name, login } = user;

    return { id, name, login };
  }
}

export default User;
