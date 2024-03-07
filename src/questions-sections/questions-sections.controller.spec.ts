import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsSectionsController } from './questions-sections.controller';
import { QuestionsSectionsService } from './questions-sections.service';

describe('QuestionsSectionsController', () => {
  let controller: QuestionsSectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsSectionsController],
      providers: [QuestionsSectionsService],
    }).compile();

    controller = module.get<QuestionsSectionsController>(QuestionsSectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
