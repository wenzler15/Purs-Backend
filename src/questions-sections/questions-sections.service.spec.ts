import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsSectionsService } from './questions-sections.service';

describe('QuestionsSectionsService', () => {
  let service: QuestionsSectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsSectionsService],
    }).compile();

    service = module.get<QuestionsSectionsService>(QuestionsSectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
