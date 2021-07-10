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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const board_entity_1 = __importDefault(require("../../entities/board.entity"));
const column_entity_1 = __importDefault(require("../../entities/column.entity"));
let BoardService = class BoardService {
    constructor(boardsRepo, columnsRepo) {
        this.boardsRepo = boardsRepo;
        this.columnsRepo = columnsRepo;
    }
    async create(createBoardDto) {
        const board = await this.boardsRepo.create(createBoardDto);
        return this.boardsRepo.save(board);
    }
    getAll() {
        return this.boardsRepo.find({ relations: ['columns'] });
    }
    getById(id) {
        return this.boardsRepo.findOne(id, {
            relations: ['columns']
        });
    }
    async updateById(id, updateBoardDto) {
        const prevBoard = await this.boardsRepo.findOne(id, {
            relations: ['columns']
        });
        const { columns = [], title } = updateBoardDto;
        const deleteRes = prevBoard?.columns
            ?.map((column) => this.columnsRepo.delete(column.id));
        if (deleteRes)
            await Promise.all(deleteRes);
        const newColumns = columns.map((column) => this.columnsRepo.create(column));
        if (title) {
            const board = await this.boardsRepo.findOne(id);
            if (board)
                await this.boardsRepo.update(id, { title });
        }
        const board = await this.boardsRepo.findOne(id);
        await this.columnsRepo.save(newColumns);
        if (board) {
            board.columns = newColumns;
            return this.boardsRepo.save(board);
        }
        return undefined;
    }
    deleteById(id) {
        return this.boardsRepo.delete(id);
    }
};
BoardService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(board_entity_1.default)),
    __param(1, typeorm_1.InjectRepository(column_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BoardService);
exports.BoardService = BoardService;
