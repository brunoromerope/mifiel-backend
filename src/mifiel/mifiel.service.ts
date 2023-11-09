import { Injectable } from '@nestjs/common';
import { CreateMifielDto } from './dto/create-mifiel.dto';
import { UpdateMifielDto } from './dto/update-mifiel.dto';

@Injectable()
export class MifielService {
  create(createMifielDto: CreateMifielDto) {
    return 'This action adds a new mifiel';
  }

  findAll() {
    return `This action returns all mifiel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mifiel`;
  }

  update(id: number, updateMifielDto: UpdateMifielDto) {
    return `This action updates a #${id} mifiel`;
  }

  remove(id: number) {
    return `This action removes a #${id} mifiel`;
  }
}
