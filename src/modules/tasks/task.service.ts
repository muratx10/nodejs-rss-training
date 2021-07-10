import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'entities/task.entity';
import { Connection, DeleteResult, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
    public connection: Connection
  ) {
  }

  async create(boardId: string, createTaskDto: CreateTaskDto) {
    const task = await this.tasksRepo.create({ ...createTaskDto, boardId });

    return this.tasksRepo.save(task);
  }

  getAll(boardId: string): Promise<Task[]> {
    return this.tasksRepo.find({
      where: { boardId },
      loadRelationIds: true,
    });
  }

  getById(boardId: string, taskId: string): Promise<Task | undefined> {
    return this.tasksRepo.findOne(taskId, {
      where: { boardId },
      loadRelationIds: true,
    });
  }

  // eslint-disable-next-line consistent-return
  async updateById(boardId: string, taskId: string, updateTaskDto: UpdateTaskDto) {
    const currentTask = await this.tasksRepo.findOne(taskId, {
      where: {boardId},
    });

    if (currentTask) {
      const updatedTask = await this.tasksRepo.update(taskId, updateTaskDto);

      return updatedTask.raw;
    }
  }

  deleteById(taskId: string): Promise<DeleteResult> {
    return this.tasksRepo.delete(taskId);
  }

}
