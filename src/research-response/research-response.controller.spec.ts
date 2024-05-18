import { Test, TestingModule } from '@nestjs/testing';
import { ResearchResponseController } from './research-response.controller';
import { ResearchResponseService } from './research-response.service';

describe('ResearchResponseController', () => {
  let controller: ResearchResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResearchResponseController],
      providers: [ResearchResponseService],
    }).compile();

    controller = module.get<ResearchResponseController>(ResearchResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
