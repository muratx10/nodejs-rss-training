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
const uuid_1 = require("uuid");
const typeorm_1 = require("typeorm");
// eslint-disable-next-line import/no-cycle
const board_entity_1 = __importDefault(require("./board.entity"));
let BoardColumn = class BoardColumn {
    constructor({ id = uuid_1.v4(), title = "", order = 0 } = {}) {
        this.boardId = "";
        this.id = id;
        this.title = title;
        this.order = order;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], BoardColumn.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 255 }),
    __metadata("design:type", String)
], BoardColumn.prototype, "title", void 0);
__decorate([
    typeorm_1.Column("integer"),
    __metadata("design:type", Number)
], BoardColumn.prototype, "order", void 0);
__decorate([
    typeorm_1.ManyToOne(() => board_entity_1.default, { onDelete: "CASCADE" }),
    __metadata("design:type", Object)
], BoardColumn.prototype, "board", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 255 }),
    __metadata("design:type", String)
], BoardColumn.prototype, "boardId", void 0);
BoardColumn = __decorate([
    typeorm_1.Entity({ name: 'Column' }),
    __metadata("design:paramtypes", [Object])
], BoardColumn);
exports.default = BoardColumn;
