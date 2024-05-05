import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QuestionSections } from './models/questions-sections.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionsSectionsEntity } from './models/questions-sections.entity';
import { Question } from 'src/questions/models/questions.interface';
import { QuestionsService } from 'src/questions/questions.service';

@Injectable()
export class QuestionsSectionsService {
  constructor(
    @InjectRepository(QuestionsSectionsEntity)
    private readonly questionSectionRepository: Repository<QuestionsSectionsEntity>,
    private readonly questionsService: QuestionsService
  ) { }

  async create(createQuestionsSectionDto: QuestionSections[]) {
    await Promise.all(createQuestionsSectionDto.map(async (item: QuestionSections) => {
      const {
        idResearch,
        desc,
        questions,
      } = item;
    
      const questionSection = await this.questionSectionRepository.save({
        idResearch,
        desc,
      });
    
      await Promise.all(questions.map(async (subitem: Question) => {
        subitem.idResearch = idResearch;
        subitem.idSection = questionSection.id;
        await this.questionsService.create(subitem);
      }));
    }));

    return { message: 'Question section created!' }
  }

  async findAll(idResearch: number) {
    const researchSections = await this.questionSectionRepository.find({ where: { idResearch }});

    return researchSections;
  }

  async findOne(id: number) {
    const sections = await this.questionSectionRepository.findOne({ where: { id } });

    if (!sections) throw new HttpException("Section didn't exists!", HttpStatus.BAD_REQUEST);

    return sections;  
  }

  async update(id: number, updateQuestionsSectionDto: QuestionSections) {
    const section = await this.questionSectionRepository.findOne({ where: { id } });

    if (!section) throw new HttpException("section didn't exists!", HttpStatus.BAD_REQUEST);

    const sectionUpdated = await this.questionSectionRepository.save({
      ...section,
      ...updateQuestionsSectionDto,
    })

    return { message: 'Section updated!', role: sectionUpdated };
  }

  async remove(id: number) {
    const section = await this.questionSectionRepository.findOne({ where: { id } });

    if (!section) throw new HttpException("section didn't exists!", HttpStatus.BAD_REQUEST);

    return { message: 'Section deleted!', question: this.questionSectionRepository.delete(id) }  }
}
