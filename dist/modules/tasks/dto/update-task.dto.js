"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_task_dto_1 = require("./create-task.dto");
class UpdateTaskDto extends mapped_types_1.PartialType(create_task_dto_1.CreateTaskDto) {
}
exports.UpdateTaskDto = UpdateTaskDto;
