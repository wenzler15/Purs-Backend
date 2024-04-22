import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QuestionAlternatives } from './models/questions-alternatives.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsAlternativesEntity } from './models/questions-alternatives.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsAlternativesService {
  constructor(
    @InjectRepository(QuestionsAlternativesEntity)
    private readonly questionsAlternativeRepository: Repository<QuestionsAlternativesEntity>,
  ) { }

  async create(createQuestionsAlternativeDto: QuestionAlternatives) {
    const question = await this.questionsAlternativeRepository.save(createQuestionsAlternativeDto);

    return { message: 'Question alternative created!', question }
  }

  async findAll(idQuestion: number) {
    const questions = await this.questionsAlternativeRepository.find({ where: { idQuestion }});

    return questions;
  }

  async findOne(id: number) {
    const questions = await this.questionsAlternativeRepository.findOne({ where: { id } });

    if (!questions) throw new HttpException("questions didn't exists!", HttpStatus.BAD_REQUEST);

    return questions;  
  }

  async update(id: number, updateQuestionsAlternativeDto: QuestionAlternatives) {
    const question = await this.questionsAlternativeRepository.findOne({ where: { id } });

    if (!question) throw new HttpException("question didn't exists!", HttpStatus.BAD_REQUEST);

    const questionUpdated = await this.questionsAlternativeRepository.save({
      ...question,
      ...updateQuestionsAlternativeDto,
    })

    return { message: 'Question updated!', role: questionUpdated };
  }

  async remove(id: number) {
    const question = await this.questionsAlternativeRepository.findOne({ where: { id } });

    if (!question) throw new HttpException("question didn't exists!", HttpStatus.BAD_REQUEST);

    return { message: 'question deleted!', question: this.questionsAlternativeRepository.delete(id) }
  }
}
