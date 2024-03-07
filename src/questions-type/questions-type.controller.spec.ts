import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsTypeController } from './questions-type.controller';
import { QuestionsTypeService } from './questions-type.service';

describe('QuestionsTypeController', () => {
  let controller: QuestionsTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsTypeController],
      providers: [QuestionsTypeService],
    }).compile();

    controller = module.get<QuestionsTypeController>(QuestionsTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
