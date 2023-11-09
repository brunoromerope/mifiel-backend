import { Module } from '@nestjs/common';
import { MifielService } from './mifiel.service';
import { MifielController } from './mifiel.controller';

@Module({
  controllers: [MifielController],
  providers: [MifielService],
})
export class MifielModule {}
