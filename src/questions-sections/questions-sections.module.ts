import { Module } from '@nestjs/common';
import { QuestionsSectionsService } from './questions-sections.service';
import { QuestionsSectionsController } from './questions-sections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsSectionsEntity } from './models/questions-sections.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { QuestionsEntity } from 'src/questions/models/questions.entity';
import { QuestionsAlternativesEntity } from 'src/questions-alternatives/models/questions-alternatives.entity';
import { QuestionsAlternativesService } from 'src/questions-alternatives/questions-alternatives.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionsSectionsEntity,
      QuestionsEntity,
      QuestionsAlternativesEntity
    ]),
  ],
  controllers: [QuestionsSectionsController],
  providers: [QuestionsSectionsService, QuestionsService, QuestionsAlternativesService]
})
export class QuestionsSectionsModule {}
