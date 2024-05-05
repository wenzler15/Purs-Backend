import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Research } from './models/research.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResearchEntity } from './models/research.entity';
import { QuestionSections } from 'src/questions-sections/models/questions-sections.interface';
import { QuestionsSectionsService } from 'src/questions-sections/questions-sections.service';
import { QuestionsService } from 'src/questions/questions.service';
import { Question } from 'src/questions/models/questions.interface';
import { QuestionsAlternativesService } from 'src/questions-alternatives/questions-alternatives.service';

@Injectable()
export class ResearchService {
  constructor(
    @InjectRepository(ResearchEntity)
    private readonly researchRepository: Repository<ResearchEntity>,
    private readonly questionsSectionsService: QuestionsSectionsService,
    private readonly questionsService: QuestionsService,
    private readonly questionsAlternativesService: QuestionsAlternativesService
  ) { }

  async create(createResearchDto: Research) {
    const { 
      subtitle,
      desc,
      title,
      idCompany,
      idUser,
      status,
      sections
    } = createResearchDto;

    const research = await this.researchRepository.save({
      subtitle,
      desc,
      title,
      idCompany,
      idUser,
      status
    });

    sections.map((item: QuestionSections) => {
      item.idResearch = research.id
    });

    await this.questionsSectionsService.create(sections)

    return { message: 'Question section created!' }
  }

  async findAll(idCompany: number) {
    const researchs = await this.researchRepository.find({ where: { idCompany }});

    return researchs;
  }

  async myResearch(idUser: number) {
    const researchs = await this.researchRepository.find({ where: { idUser }});

    await Promise.all(researchs.map(async (research: Research) => {
      research.sections = await this.questionsSectionsService.findAll(research.id) 

      await Promise.all(research.sections.map(async (section: QuestionSections) => {
        section.questions = await this.questionsService.findAll(section.id);
  
        await Promise.all(section.questions.map(async (question: Question) => {
          question.alternatives = await this.questionsAlternativesService.findAll(question.id);
        }));
      }));
    })) 
   
    return researchs;
  }

  async findOne(id: number) {
    const research: Research = await this.researchRepository.findOne({ where: { id } });

    if (!research) {
      throw new HttpException("Research doesn't exist!", HttpStatus.BAD_REQUEST);
    }

    research.sections = await this.questionsSectionsService.findAll(research.id) 

    await Promise.all(research.sections.map(async (section: QuestionSections) => {
      section.questions = await this.questionsService.findAll(section.id);

      await Promise.all(section.questions.map(async (question: Question) => {
        question.alternatives = await this.questionsAlternativesService.findAll(question.id);
      }));
    }));

    return research;
  }

  async update(id: number, updateResearchDto: Research) {
    const research = await this.researchRepository.findOne({ where: { id } });

    if (!research) throw new HttpException("Research didn't exists!", HttpStatus.BAD_REQUEST);

    const researchUpdated = await this.researchRepository.save({
      ...research,
      ...updateResearchDto,
    })

    return { message: 'Research updated!', role: researchUpdated };
  }

  async remove(id: number) {
    const research = await this.researchRepository.findOne({ where: { id } });

    if (!research) throw new HttpException("Research didn't exists!", HttpStatus.BAD_REQUEST);

    return { message: 'Research deleted!', question: this.researchRepository.delete(id) }  }  
}
