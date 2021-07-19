import { MiddlewareConsumer , NestModule , Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "app.controller";
import { AppService } from "app.service";
import ormConfig from "config/orm.config";
import { AuthModule } from "modules/auth/auth.module";
import { BoardModule } from "modules/boards/board.module";
import { TaskModule } from "modules/tasks/task.module";
import { UserModule } from "modules/users/user.module";
import { Connection } from 'typeorm';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        name: "default",
        type: configService.get('DB_TYPE'),
        host: configService.get('DB_HOST'),
        // eslint-disable-next-line radix
        port: parseInt(<string>configService.get('DB_PORT')),
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
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    BoardModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  constructor(public connection: Connection) {}

  // eslint-disable-next-line class-methods-use-this
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
