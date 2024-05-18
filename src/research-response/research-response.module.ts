import { Module } from '@nestjs/common';
import { ResearchResponseService } from './research-response.service';
import { ResearchResponseController } from './research-response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearchResponseEntity } from './models/research-response.entity';
import { SurveyResponseStatusEntity } from './models/survey-response-status.entity';
import { ResearchEntity } from 'src/research/models/research.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResearchResponseEntity,
      SurveyResponseStatusEntity,
      ResearchEntity
    ]),
  ],
  controllers: [ResearchResponseController],
  providers: [ResearchResponseService]
})
export class ResearchResponseModule {}
