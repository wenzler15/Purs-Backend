import { Module } from '@nestjs/common';
import { QuestionsAlternativesService } from './questions-alternatives.service';
import { QuestionsAlternativesController } from './questions-alternatives.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsAlternativesEntity } from './models/questions-alternatives.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionsAlternativesEntity,
    ]),
  ],
  controllers: [QuestionsAlternativesController],
  providers: [QuestionsAlternativesService]
})
export class QuestionsAlternativesModule {}
