"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLog = exports.log = exports.logger = void 0;
const winston_1 = require("winston");
const { colorize, cli, json, combine } = winston_1.format;
exports.logger = winston_1.createLogger({
    level: 'silly',
    transports: [
        new winston_1.transports.Console({
            format: combine(colorize(), cli())
        }),
        new winston_1.transports.File({
            filename: 'logs/error.log',
            format: json(),
            level: 'error',
        }),
    ],
    exitOnError: true,
});
const log = (msg, meta) => {
    exports.logger.debug(msg, meta);
};
exports.log = log;
const errorLog = (errMsg, meta) => {
    exports.logger.error(errMsg, meta);
};
exports.errorLog = errorLog;
