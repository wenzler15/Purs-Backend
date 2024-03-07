import { Module } from '@nestjs/common';
import { QuestionsSectionsService } from './questions-sections.service';
import { QuestionsSectionsController } from './questions-sections.controller';

@Module({
  controllers: [QuestionsSectionsController],
  providers: [QuestionsSectionsService]
})
export class QuestionsSectionsModule {}
