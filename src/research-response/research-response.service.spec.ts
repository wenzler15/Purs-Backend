import { Test, TestingModule } from '@nestjs/testing';
import { ResearchResponseService } from './research-response.service';

describe('ResearchResponseService', () => {
  let service: ResearchResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearchResponseService],
    }).compile();

    service = module.get<ResearchResponseService>(ResearchResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
