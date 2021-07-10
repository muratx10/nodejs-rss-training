"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("../../entities/task.entity");
const typeorm_2 = require("typeorm");
let TaskService = class TaskService {
    constructor(tasksRepo, connection) {
        this.tasksRepo = tasksRepo;
        this.connection = connection;
    }
    async create(boardId, createTaskDto) {
        const task = await this.tasksRepo.create({ ...createTaskDto, boardId });
        return this.tasksRepo.save(task);
    }
    getAll(boardId) {
        return this.tasksRepo.find({
            where: { boardId },
            loadRelationIds: true,
        });
    }
    getById(boardId, taskId) {
        return this.tasksRepo.findOne(taskId, {
            where: { boardId },
            loadRelationIds: true,
        });
    }
    // eslint-disable-next-line consistent-return
    async updateById(boardId, taskId, updateTaskDto) {
        const currentTask = await this.tasksRepo.findOne(taskId, {
            where: { boardId },
        });
        if (currentTask) {
            const updatedTask = await this.tasksRepo.update(taskId, updateTaskDto);
            return updatedTask.raw;
        }
    }
    deleteById(taskId) {
        return this.tasksRepo.delete(taskId);
    }
};
TaskService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Connection])
], TaskService);
exports.TaskService = TaskService;
