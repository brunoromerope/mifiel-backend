import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  controllers: [PdfController],
  providers: [PdfService, JwtService, JwtStrategy],
})
export class PdfModule {}
