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
const column_entity_1 = __importDefault(require("./column.entity"));
let Board = class Board {
    constructor({ id = uuid_1.v4(), title = "board", columns = [{
            id: uuid_1.v4(),
            title: "Column title",
            order: 0
        }] } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Board.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 255 }),
    __metadata("design:type", String)
], Board.prototype, "title", void 0);
__decorate([
    typeorm_1.OneToMany(() => column_entity_1.default, column => column.board, { onDelete: "CASCADE", cascade: true, eager: true }),
    __metadata("design:type", Array)
], Board.prototype, "columns", void 0);
Board = __decorate([
    typeorm_1.Entity({ name: 'Board' }),
    __metadata("design:paramtypes", [Object])
], Board);
exports.default = Board;
