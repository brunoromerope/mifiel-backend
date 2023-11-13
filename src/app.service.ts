import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService){}

  getStatus(): string {
    return 'Running';
  }

  getAPP_ID(): string {
    return this.configService.get<string>('APP_ID');
  }

  getAPP_SECRET(): string {
    return this.configService.get<string>('APP_SECRET');
  }
}
