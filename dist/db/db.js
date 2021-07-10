"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRootUser = exports.tryDBConnect = exports.connectToDB = void 0;
const orm_config_1 = __importDefault(require("../config/orm.config"));
const typeorm_1 = require("typeorm");
const usersService = __importStar(require("../modules/users/user.service"));
const user_entity_1 = __importDefault(require("../entities/user.entity"));
/* eslint-disable no-console */
const connectToDB = async () => {
    let connection = null;
    try {
        connection = typeorm_1.getConnection();
    }
    catch (error) {
        console.log('Connection does not exist: ', error.message);
    }
    try {
        if (connection) {
            if (!connection.isConnected)
                await connection.connect();
        }
        else {
            connection = await typeorm_1.createConnection(orm_config_1.default);
        }
        await connection.runMigrations();
        console.log('DB has connected');
    }
    catch (error) {
        console.error(error);
    }
};
exports.connectToDB = connectToDB;
const tryDBConnect = async (cb) => {
    await exports.connectToDB();
    cb();
};
exports.tryDBConnect = tryDBConnect;
const initRootUser = async () => {
    const admin = await usersService.getByUsername('admin');
    if (!admin) {
        await usersService.create(new user_entity_1.default({
            name: 'admin',
            login: 'admin',
            password: 'admin',
        }));
    }
};
exports.initRootUser = initRootUser;
