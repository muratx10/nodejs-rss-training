import { ReasonPhrases } from 'http-status-codes';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { User } from 'entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Pick<User, "id" | "name" | "login">> {
    const user = await this.userService.create(createUserDto);

    if (user) return User.toResponse(user);

    throw new HttpException(ReasonPhrases.BAD_REQUEST, HttpStatus.BAD_REQUEST);
  }

  @Get()
  async getAll(): Promise<Pick<User, "id" | "name" | "login">[]> {
    const users = await this.userService.getAll();

    return users.map(User.toResponse);
  }

  @Get(':id')
  async getById(@Param(':id') id: string): Promise<Pick<User, "id" | "name" | "login">> {
    const user = await this.userService.getById(id);

    if (user) return User.toResponse(user);

    throw new HttpException(ReasonPhrases.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.updateById(id, updateUserDto);

    if (updatedUser) return updateUserDto;

    throw new HttpException(ReasonPhrases.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<DeleteResult> {
    const res = await this.userService.deleteById(id);

    if (res) return res;

    throw new HttpException(ReasonPhrases.NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
