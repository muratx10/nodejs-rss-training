import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // eslint-disable-next-line class-methods-use-this
  runApp(): string {
    return 'Service is running...';
  }
}
