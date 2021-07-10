"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_TEXT_LENGTH = exports.routes = exports.notFoundError = void 0;
exports.notFoundError = 'Not found';
exports.routes = {
    users: '/users',
    boards: '/boards',
    tasks: '/boards/:boardId/tasks',
    login: '/login',
};
exports.MAX_TEXT_LENGTH = 255;
