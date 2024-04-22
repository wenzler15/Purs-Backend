import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsEntity } from './models/questions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionsEntity,
    ]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService]
})
export class QuestionsModule {}
