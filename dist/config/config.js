"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_MODE = exports.TOKEN_EXPIRE_TIME = exports.SALT = exports.SECRET = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USER = exports.DB_PORT = exports.DB_HOST = exports.DB_TYPE = exports.LOG_FOLDER = exports.JWT_SECRET_KEY = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(__dirname, '../../.env'),
});
_a = process.env, exports.PORT = _a.PORT, exports.NODE_ENV = _a.NODE_ENV, exports.JWT_SECRET_KEY = _a.JWT_SECRET_KEY, exports.LOG_FOLDER = _a.LOG_FOLDER, exports.DB_TYPE = _a.DB_TYPE, exports.DB_HOST = _a.DB_HOST, exports.DB_PORT = _a.DB_PORT, exports.DB_USER = _a.DB_USER, exports.DB_PASSWORD = _a.DB_PASSWORD, exports.DB_NAME = _a.DB_NAME, exports.SECRET = _a.SECRET, exports.SALT = _a.SALT, exports.TOKEN_EXPIRE_TIME = _a.TOKEN_EXPIRE_TIME;
exports.AUTH_MODE = process.env.AUTH_MODE === 'true';
