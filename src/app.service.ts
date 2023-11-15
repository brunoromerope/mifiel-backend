import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService){}

  // Test function
  getStatus(): string {
    return 'Running';
  }

  // Return mifiel API_ID from .env
  getAPP_ID(): string {
    return this.configService.get<string>('APP_ID');
  }

  // Return mifiel APP_SECRET from .env
  getAPP_SECRET(): string {
    return this.configService.get<string>('APP_SECRET');
  }
}
