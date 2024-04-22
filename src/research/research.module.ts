import { Module } from '@nestjs/common';
import { ResearchService } from './research.service';
import { ResearchController } from './research.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearchEntity } from './models/research.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResearchEntity
    ]),
  ],
  controllers: [ResearchController],
  providers: [ResearchService]
})
export class ResearchModule {}
