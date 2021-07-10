import { v4 as uuid } from "uuid";
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';
import { SALT } from "config/config";
import { IUser, IUserResponse } from "../interfaces/interfaces";
// eslint-disable-next-line import/no-cycle
import { encodePassword } from "../resources/auth/auth.service";

@Entity({name: 'User'})
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  public login: string;

  @Column('varchar', {length: 255})
  public id: string;

  @Column('varchar', {length: 255})
  public name: string;

  @Column('varchar', {length: 255})
  public passwordHash: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    await bcrypt.hash(this.passwordHash, SALT).then(hash => {
      this.passwordHash = hash;
    });
  }

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
