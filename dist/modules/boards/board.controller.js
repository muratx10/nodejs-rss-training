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
exports.BoardController = void 0;
const common_1 = require("@nestjs/common");
const http_status_codes_1 = require("http-status-codes");
const create_board_dto_1 = require("./dto/create-board.dto");
const update_board_dto_1 = require("./dto/update-board.dto");
const board_service_1 = require("./board.service");
let BoardController = class BoardController {
    constructor(boardService) {
        this.boardService = boardService;
    }
    async create(createBoardDto) {
        return this.boardService.create(createBoardDto);
    }
    async getAll() {
        return this.boardService.getAll();
    }
    async getById(id) {
        const board = await this.boardService.getById(id);
        if (board)
            return board;
        throw new common_1.HttpException(http_status_codes_1.ReasonPhrases.NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
    }
    async updateById(id, updateBoardDto) {
        const res = await this.boardService.updateById(id, updateBoardDto);
        if (res)
            return res;
        throw new common_1.HttpException(http_status_codes_1.ReasonPhrases.NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
    }
    async deleteById(id) {
        const res = await this.boardService.deleteById(id);
        if (res)
            return res;
        throw new common_1.HttpException(http_status_codes_1.ReasonPhrases.NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_board_dto_1.CreateBoardDto]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "getById", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_board_dto_1.UpdateBoardDto]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "updateById", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "deleteById", null);
BoardController = __decorate([
    common_1.Controller('boards'),
    __metadata("design:paramtypes", [board_service_1.BoardService])
], BoardController);
exports.BoardController = BoardController;
