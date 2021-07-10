"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequest = void 0;
const handleRequest = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    }
    catch (e) {
        next(e);
    }
};
exports.handleRequest = handleRequest;
