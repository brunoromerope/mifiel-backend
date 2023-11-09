import { Test, TestingModule } from '@nestjs/testing';
import { MifielService } from './mifiel.service';

describe('MifielService', () => {
  let service: MifielService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MifielService],
    }).compile();

    service = module.get<MifielService>(MifielService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
