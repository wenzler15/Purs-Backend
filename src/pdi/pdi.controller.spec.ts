import { Test, TestingModule } from '@nestjs/testing';
import { PdiController } from './pdi.controller';
import { PdiService } from './pdi.service';

describe('PdiController', () => {
  let controller: PdiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdiController],
      providers: [PdiService],
    }).compile();

    controller = module.get<PdiController>(PdiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
