import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), ApiModule, PdfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
