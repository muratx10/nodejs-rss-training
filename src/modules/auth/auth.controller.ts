import {
  Controller,
  Inject,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';

@Controller('login')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService
  ) {
  }

  @Post()
  @UseGuards()
  async login(@Request() authRequestDto: AuthRequestDto) {
    const token = await this.authService.getToken(authRequestDto.user);

    return { token };
  }

}
