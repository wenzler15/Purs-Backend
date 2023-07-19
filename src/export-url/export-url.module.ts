import { Module } from '@nestjs/common';
import { ExportUrlService } from './export-url.service';
import { ExportUrlController } from './export-url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportUrlEntity } from './models/exportUrl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExportUrlEntity])],
  controllers: [ExportUrlController],
  providers: [ExportUrlService]
})
export class ExportUrlModule { }
