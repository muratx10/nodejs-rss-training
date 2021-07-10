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
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../entities/user.entity");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto) {
        const user = await this.userService.create(createUserDto);
        if (user)
            return user_entity_1.User.toResponse(user);
        throw new common_1.HttpException(http_status_codes_1.ReasonPhrases.BAD_REQUEST, common_1.HttpStatus.BAD_REQUEST);
    }
    async getAll() {
        const users = await this.userService.getAll();
        return users.map(user_entity_1.User.toResponse);
    }
    async getById(id) {
        const user = await this.userService.getById(id);
        if (user)
            return user_entity_1.User.toResponse(user);
        throw new common_1.HttpException(http_status_codes_1.ReasonPhrases.NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
    }
    async updateById(id, updateUserDto) {
        const updatedUser = await this.userService.updateById(id, updateUserDto);
        if (updatedUser)
            return updateUserDto;
        throw new common_1.HttpException(http_status_codes_1.ReasonPhrases.NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
    }
    async deleteById(id) {
        const res = await this.userService.deleteById(id);
        if (res)
            return res;
        throw new common_1.HttpException(http_status_codes_1.ReasonPhrases.NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param(':id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateById", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteById", null);
UserController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
