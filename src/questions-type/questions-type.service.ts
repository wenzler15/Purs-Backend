import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QuestionType } from './models/questions-type.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsTypeEntity } from './models/questions-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsTypeService {
  constructor(
    @InjectRepository(QuestionsTypeEntity)
    private readonly questionTypeRepository: Repository<QuestionsTypeEntity>,
  ) { }

  async create(createQuestionsTypeDto: QuestionType) {
    const question = await this.questionTypeRepository.save(createQuestionsTypeDto);

    return { message: 'Question created!', question }
  }

  async findAll() {
    const questions = await this.questionTypeRepository.find();

    return questions;
  }

  async findOne(id: number) {
    const questions = await this.questionTypeRepository.findOne({ where: { id } });

    if (!questions) throw new HttpException("questions didn't exists!", HttpStatus.BAD_REQUEST);

    return questions;
  }

  async update(id: number, updateQuestionsTypeDto: QuestionType) {
    const question = await this.questionTypeRepository.findOne({ where: { id } });

    if (!question) throw new HttpException("question didn't exists!", HttpStatus.BAD_REQUEST);

    const questionUpdated = await this.questionTypeRepository.save({
      ...question,
      ...updateQuestionsTypeDto,
    })

    return { message: 'Question updated!', role: questionUpdated };
  }

  async remove(id: number) {
    const question = await this.questionTypeRepository.findOne({ where: { id } });

    if (!question) throw new HttpException("question didn't exists!", HttpStatus.BAD_REQUEST);

    return { message: 'question deleted!', question: this.questionTypeRepository.delete(id) }
  }
}
