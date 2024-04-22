import { Module } from '@nestjs/common';
import { QuestionsTypeService } from './questions-type.service';
import { QuestionsTypeController } from './questions-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsTypeEntity } from './models/questions-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionsTypeEntity,
    ]),
  ],
  controllers: [QuestionsTypeController],
  providers: [QuestionsTypeService]
})
export class QuestionsTypeModule {}
