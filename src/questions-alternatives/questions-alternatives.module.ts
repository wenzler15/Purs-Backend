import { Module } from '@nestjs/common';
import { QuestionsAlternativesService } from './questions-alternatives.service';
import { QuestionsAlternativesController } from './questions-alternatives.controller';

@Module({
  controllers: [QuestionsAlternativesController],
  providers: [QuestionsAlternativesService]
})
export class QuestionsAlternativesModule {}
