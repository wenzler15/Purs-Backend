import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsEntity } from './models/questions.entity';
import { QuestionsAlternativesService } from 'src/questions-alternatives/questions-alternatives.service';
import { QuestionsAlternativesEntity } from 'src/questions-alternatives/models/questions-alternatives.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionsEntity,
      QuestionsAlternativesEntity
    ]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionsAlternativesService]
})
export class QuestionsModule {}
