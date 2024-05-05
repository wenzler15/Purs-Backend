import { Module } from '@nestjs/common';
import { ResearchService } from './research.service';
import { ResearchController } from './research.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearchEntity } from './models/research.entity';
import { QuestionsSectionsService } from 'src/questions-sections/questions-sections.service';
import { QuestionsSectionsEntity } from 'src/questions-sections/models/questions-sections.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { QuestionsEntity } from 'src/questions/models/questions.entity';
import { QuestionsAlternativesEntity } from 'src/questions-alternatives/models/questions-alternatives.entity';
import { QuestionsAlternativesService } from 'src/questions-alternatives/questions-alternatives.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResearchEntity,
      QuestionsSectionsEntity,
      QuestionsEntity,
      QuestionsAlternativesEntity
    ]),
  ],
  controllers: [ResearchController],
  providers: [ResearchService, QuestionsSectionsService, QuestionsService, QuestionsAlternativesService]
})
export class ResearchModule {}
