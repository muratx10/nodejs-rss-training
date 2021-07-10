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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const http_status_codes_1 = require("http-status-codes");
const task_service_1 = require("./task.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async create(boardId, createTaskDto) {
        return this.taskService.create(boardId, createTaskDto);
    }
    async getAll(boardId) {
        return this.taskService.getAll(boardId);
    }
    async getById(id, boardId) {
        const task = await this.taskService.getById(boardId, id);
        if (task)
            return task;
        throw new common_1.HttpException(http_status_codes_1.ReasonPhrases.NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
    }
    async updateById(id, boardId, updateTaskDto) {
        const res = await this.taskService.updateById(boardId, id, updateTaskDto);
        if (res)
            return res;
        throw new common_1.HttpException(http_status_codes_1.ReasonPhrases.NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
    }
    async deleteById(id) {
        const res = await this.taskService.deleteById(id);
        if (res)
            return res;
        throw new common_1.HttpException(http_status_codes_1.ReasonPhrases.NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Param('boardId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Param('boardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Param('boardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getById", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Param('boardId')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateById", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteById", null);
TaskController = __decorate([
    common_1.Controller('boards/:boardId/tasks'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
