import { Module } from '@nestjs/common';
import { QuestionsSectionsService } from './questions-sections.service';
import { QuestionsSectionsController } from './questions-sections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsSectionsEntity } from './models/questions-sections.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionsSectionsEntity
    ]),
  ],
  controllers: [QuestionsSectionsController],
  providers: [QuestionsSectionsService]
})
export class QuestionsSectionsModule {}
