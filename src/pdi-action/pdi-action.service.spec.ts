import { Test, TestingModule } from '@nestjs/testing';
import { PdiActionService } from './pdi-action.service';

describe('PdiActionService', () => {
  let service: PdiActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdiActionService],
    }).compile();

    service = module.get<PdiActionService>(PdiActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
