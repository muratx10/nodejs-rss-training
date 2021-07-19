import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReasonPhrases } from 'http-status-codes';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('boards/:boardId/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create(boardId, createTaskDto);
  }

  @Get()
  async getAll(@Param('boardId') boardId: string) {
    return this.taskService.getAll(boardId);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Param('boardId') boardId: string) {
    const task = await this.taskService.getById(boardId, id);
    if (task) return task;
    throw new HttpException(ReasonPhrases.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Param('boardId') boardId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const res = await this.taskService.updateById(boardId, id, updateTaskDto);
    if (res) return res;
    throw new HttpException(ReasonPhrases.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const res = await this.taskService.deleteById(id);

    if (res) return res;

    throw new HttpException(ReasonPhrases.NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
