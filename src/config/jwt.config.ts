import { registerAs } from '@nestjs/config';
import { JWT_SECRET_KEY } from './config';

export default registerAs('jwt.config', () => ({
    secret: JWT_SECRET_KEY,
    signOptions: {
      expiresIn: '60m',
    },
  }));
