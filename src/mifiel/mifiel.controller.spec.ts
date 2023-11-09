import { Test, TestingModule } from '@nestjs/testing';
import { MifielController } from './mifiel.controller';
import { MifielService } from './mifiel.service';

describe('MifielController', () => {
  let controller: MifielController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MifielController],
      providers: [MifielService],
    }).compile();

    controller = module.get<MifielController>(MifielController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
