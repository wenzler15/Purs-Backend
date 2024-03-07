import { Injectable } from '@nestjs/common';
import { CreateQuestionsTypeDto } from './dto/create-questions-type.dto';
import { UpdateQuestionsTypeDto } from './dto/update-questions-type.dto';

@Injectable()
export class QuestionsTypeService {
  create(createQuestionsTypeDto: CreateQuestionsTypeDto) {
    return 'This action adds a new questionsType';
  }

  findAll() {
    return `This action returns all questionsType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionsType`;
  }

  update(id: number, updateQuestionsTypeDto: UpdateQuestionsTypeDto) {
    return `This action updates a #${id} questionsType`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionsType`;
  }
}
