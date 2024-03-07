import { Module } from '@nestjs/common';
import { QuestionsTypeService } from './questions-type.service';
import { QuestionsTypeController } from './questions-type.controller';

@Module({
  controllers: [QuestionsTypeController],
  providers: [QuestionsTypeService]
})
export class QuestionsTypeModule {}
