"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const config_2 = require("./config");
exports.default = config_1.registerAs('jwt.config', () => ({
    secret: config_2.JWT_SECRET_KEY,
    signOptions: {
        expiresIn: '60m',
    },
}));
