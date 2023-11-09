import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MifielModule } from './mifiel/mifiel.module';

@Module({
  imports: [MifielModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
