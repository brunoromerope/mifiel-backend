import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MifielService } from './mifiel.service';
import { CreateMifielDto } from './dto/create-mifiel.dto';

@Controller('mifiel')
export class MifielController {
  constructor(private readonly mifielService: MifielService) {}

  @Post()
  create(@Body() createMifielDto: CreateMifielDto) {
    return this.mifielService.create(createMifielDto);
  }

  @Get()
  findAll() {
    return this.mifielService.findAll();
  }
  
}
