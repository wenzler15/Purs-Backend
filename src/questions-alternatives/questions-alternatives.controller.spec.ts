import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsAlternativesController } from './questions-alternatives.controller';
import { QuestionsAlternativesService } from './questions-alternatives.service';

describe('QuestionsAlternativesController', () => {
  let controller: QuestionsAlternativesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsAlternativesController],
      providers: [QuestionsAlternativesService],
    }).compile();

    controller = module.get<QuestionsAlternativesController>(QuestionsAlternativesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
