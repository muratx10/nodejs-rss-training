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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const orm_config_1 = __importDefault(require("./config/orm.config"));
const auth_module_1 = require("./modules/auth/auth.module");
const board_module_1 = require("./modules/boards/board.module");
const task_module_1 = require("./modules/tasks/task.module");
const user_module_1 = require("./modules/users/user.module");
const typeorm_2 = require("typeorm");
const logger_middleware_1 = require("./middlewares/logger.middleware");
let AppModule = class AppModule {
    constructor(connection) {
        this.connection = connection;
    }
    // eslint-disable-next-line class-methods-use-this
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [orm_config_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    name: "default",
                    type: configService.get('DB_TYPE'),
                    host: configService.get('DB_HOST'),
                    // eslint-disable-next-line radix
                    port: parseInt(configService.get('DB_PORT')),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    synchronize: true,
                    logging: true,
                    migrationsRun: true,
                    autoReconnect: true,
                    entities: ['./src/entities/**/*.ts'],
                    migrations: ['./src/migration/*.ts'],
                    cli: {
                        migrationsDir: "./src/migration"
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            board_module_1.BoardModule,
            task_module_1.TaskModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], AppModule);
exports.AppModule = AppModule;
