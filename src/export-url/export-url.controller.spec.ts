import { Test, TestingModule } from '@nestjs/testing';
import { ExportUrlController } from './export-url.controller';
import { ExportUrlService } from './export-url.service';

describe('ExportUrlController', () => {
  let controller: ExportUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExportUrlController],
      providers: [ExportUrlService],
    }).compile();

    controller = module.get<ExportUrlController>(ExportUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
