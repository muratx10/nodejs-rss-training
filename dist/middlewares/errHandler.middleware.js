"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errHandlerMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const logger_1 = require("../utils/logger");
const errHandlerMiddleware = (err, _req, res, _next) => {
    logger_1.errorLog(err.message, err);
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send(http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR);
};
exports.errHandlerMiddleware = errHandlerMiddleware;
