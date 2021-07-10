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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const interfaces_1 = require("../interfaces/interfaces");
const typeorm_1 = require("typeorm");
const board_entity_1 = __importDefault(require("./board.entity"));
const user_entity_1 = require("./user.entity");
let Task = class Task {
    constructor() {
        this.userId = null;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 255 }),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('integer'),
    __metadata("design:type", Number)
], Task.prototype, "order", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 200 }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.id, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    typeorm_1.JoinColumn({ name: 'userId' }),
    __metadata("design:type", Object)
], Task.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => board_entity_1.default, (board) => board.id, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'boardId' }),
    __metadata("design:type", String)
], Task.prototype, "boardId", void 0);
__decorate([
    typeorm_1.Column('uuid', { nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "columnId", void 0);
Task = __decorate([
    typeorm_1.Entity({ name: 'task' })
], Task);
exports.Task = Task;
