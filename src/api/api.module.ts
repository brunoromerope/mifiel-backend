import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  controllers: [ApiController],
  providers: [ApiService, JwtService, JwtStrategy],
})
export class ApiModule {}
