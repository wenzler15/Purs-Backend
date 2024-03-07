import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsAlternativesService } from './questions-alternatives.service';

describe('QuestionsAlternativesService', () => {
  let service: QuestionsAlternativesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsAlternativesService],
    }).compile();

    service = module.get<QuestionsAlternativesService>(QuestionsAlternativesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
