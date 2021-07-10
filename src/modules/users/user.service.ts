import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { Connection, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    public connection: Connection
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepo.create(createUserDto);

    return this.usersRepo.save(user);
  }

  getAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  getById(id: string): Promise<User | undefined> {
    return this.usersRepo.findOne(id);
  }

  getByLogin(login: string): Promise<User | undefined> {
    return this.usersRepo.findOne({
      where: { login }
    });
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult | undefined> {
    const user = await this.usersRepo.findOne(id);

    if (user) return this.usersRepo.update(id, updateUserDto);

    return undefined;
  }

  deleteById(id: string): Promise<DeleteResult> {
    return this.usersRepo.delete(id);
  }
}
