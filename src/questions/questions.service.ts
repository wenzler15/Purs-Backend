import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Question } from './models/questions.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsEntity } from './models/questions.entity';
import { Repository } from 'typeorm';
import { QuestionAlternatives } from 'src/questions-alternatives/models/questions-alternatives.interface';
import { QuestionsAlternativesService } from 'src/questions-alternatives/questions-alternatives.service';
@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionsEntity)
    private readonly questionsRepository: Repository<QuestionsEntity>,
    private readonly questionsAlternativesService: QuestionsAlternativesService
  ) { }

  async create(createQuestionDto: Question) {

    const {
      idResearch,
      desc,
      idSection,
      idQuestionType,
      notNull,
      redirectSection,
      alternatives
    } = createQuestionDto

    const question = await this.questionsRepository.save({
      idResearch,
      desc,
      idSection,
      idQuestionType,
      notNull,
      redirectSection,
    });

    if (idQuestionType === 3 || idQuestionType === 4) {
      alternatives.map(async (item: QuestionAlternatives) => {
        item.idQuestion = question.id

        await this.questionsAlternativesService.create(item)
      });
    }

    return { message: 'Question created!', question }
  }

  async findAll(idSection: number) {
    const questions = await this.questionsRepository.find({ where: { idSection } });

    return questions;
  }

  async findOne(id: number) {
    const questions = await this.questionsRepository.findOne({ where: { id } });

    if (!questions) throw new HttpException("questions didn't exists!", HttpStatus.BAD_REQUEST);

    return questions;
  }

  async update(id: number, updateQuestionDto: Question) {
    const question = await this.questionsRepository.findOne({ where: { id } });

    if (!question) throw new HttpException("question didn't exists!", HttpStatus.BAD_REQUEST);

    const questionUpdated = await this.questionsRepository.save({
      ...question,
      ...updateQuestionDto,
    })

    return { message: 'Question updated!', role: questionUpdated };
  }

  async remove(id: number) {
    const question = await this.questionsRepository.findOne({ where: { id } });

    if (!question) throw new HttpException("question didn't exists!", HttpStatus.BAD_REQUEST);

    return { message: 'question deleted!', question: this.questionsRepository.delete(id) }
  }
}
