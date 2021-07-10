import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import jwtConfig from 'config/jwt.config';
import { User } from 'entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: jwtConfig,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
