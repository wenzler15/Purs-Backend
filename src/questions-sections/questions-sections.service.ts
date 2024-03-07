import { Injectable } from '@nestjs/common';
import { CreateQuestionsSectionDto } from './dto/create-questions-section.dto';
import { UpdateQuestionsSectionDto } from './dto/update-questions-section.dto';

@Injectable()
export class QuestionsSectionsService {
  create(createQuestionsSectionDto: CreateQuestionsSectionDto) {
    return 'This action adds a new questionsSection';
  }

  findAll() {
    return `This action returns all questionsSections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionsSection`;
  }

  update(id: number, updateQuestionsSectionDto: UpdateQuestionsSectionDto) {
    return `This action updates a #${id} questionsSection`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionsSection`;
  }
}
