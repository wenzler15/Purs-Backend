import { Injectable } from '@nestjs/common';
import { CreateQuestionsAlternativeDto } from './dto/create-questions-alternative.dto';
import { UpdateQuestionsAlternativeDto } from './dto/update-questions-alternative.dto';

@Injectable()
export class QuestionsAlternativesService {
  create(createQuestionsAlternativeDto: CreateQuestionsAlternativeDto) {
    return 'This action adds a new questionsAlternative';
  }

  findAll() {
    return `This action returns all questionsAlternatives`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionsAlternative`;
  }

  update(id: number, updateQuestionsAlternativeDto: UpdateQuestionsAlternativeDto) {
    return `This action updates a #${id} questionsAlternative`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionsAlternative`;
  }
}
