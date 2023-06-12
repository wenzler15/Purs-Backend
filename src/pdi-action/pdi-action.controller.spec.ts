import { Test, TestingModule } from '@nestjs/testing';
import { PdiActionController } from './pdi-action.controller';
import { PdiActionService } from './pdi-action.service';

describe('PdiActionController', () => {
  let controller: PdiActionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdiActionController],
      providers: [PdiActionService],
    }).compile();

    controller = module.get<PdiActionController>(PdiActionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
