import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsTypeService } from './questions-type.service';

describe('QuestionsTypeService', () => {
  let service: QuestionsTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsTypeService],
    }).compile();

    service = module.get<QuestionsTypeService>(QuestionsTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
