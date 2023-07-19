import { Test, TestingModule } from '@nestjs/testing';
import { ExportUrlService } from './export-url.service';

describe('ExportUrlService', () => {
  let service: ExportUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExportUrlService],
    }).compile();

    service = module.get<ExportUrlService>(ExportUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
