import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService, JwtService, JwtStrategy],
})
export class DocumentModule {}
