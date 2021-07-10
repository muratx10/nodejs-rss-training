import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { SALT } from 'config/config';
import * as bcrypt from 'bcrypt';
import { IUser } from 'interfaces/interfaces';

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
  async encryptPassword(): Promise<void> {

    await bcrypt.hash(this.passwordHash, SALT).then((hash: string) => {
      this.passwordHash = hash;
    });
  }

  public static toResponse(user: User): Pick<User, 'id' | 'name' | 'login'> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
