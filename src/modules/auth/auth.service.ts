import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {
  }

  getToken(user: User): string {
    return this.jwtService.sign({
      login: user.login,
      userId: user.id
    });
  }
}
