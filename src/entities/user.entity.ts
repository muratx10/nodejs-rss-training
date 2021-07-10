import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { SALT } from '../config/config';
import { IUser } from '../interfaces/interfaces';

@Entity({ name: 'user' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 255 })
  name!: string;

  @Column('varchar', { length: 255 })
  login!: string;

  @Column('varchar', { length: 255 })
  passwordHash!: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    await bcrypt.hash(this.passwordHash, SALT).then((hash) => {
      this.passwordHash = hash;
    });
  }

  public static toResponse(user: User): Pick<User, 'id' | 'name' | 'login'> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
