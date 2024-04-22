import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QuestionSections } from './models/questions-sections.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionsSectionsEntity } from './models/questions-sections.entity';

@Injectable()
export class QuestionsSectionsService {
  constructor(
    @InjectRepository(QuestionsSectionsEntity)
    private readonly questionSectionRepository: Repository<QuestionsSectionsEntity>,
  ) { }

  async create(createQuestionsSectionDto: QuestionSections) {
    const question = await this.questionSectionRepository.save(createQuestionsSectionDto);

    return { message: 'Question section created!', question }
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
