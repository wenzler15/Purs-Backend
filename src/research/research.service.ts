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
const jwt = require('jsonwebtoken');

@Injectable()
export class ResearchService {
  constructor(
    @InjectRepository(ResearchEntity)
    private readonly researchRepository: Repository<ResearchEntity>,
    private readonly questionsSectionsService: QuestionsSectionsService,
    private readonly questionsService: QuestionsService,
    private readonly questionsAlternativesService: QuestionsAlternativesService
  ) { }

  async init(createResearchDto: Research) {
    const question = await this.researchRepository.save(createResearchDto);

    return { message: 'Research created!', question }
  }

  async create(createResearchDto: Research, id: number) {
    const { 
      subtitle,
      desc,
      title,
      idCompany,
      idUser,
      status,
      sections
    } = createResearchDto;

    const researchOrigin = await this.researchRepository.findOne({ where: { id } });

    if (!researchOrigin) throw new HttpException("Research didn't exists!", HttpStatus.BAD_REQUEST);

    const infosUpdate = {
      subtitle,
      desc,
      title,
      idCompany,
      idUser,
      status
    }

    await this.researchRepository.save({
      ...researchOrigin,
      ...infosUpdate,
    })

    sections.map((item: QuestionSections) => {
      item.idResearch = id
    });

    await this.questionsSectionsService.create(sections)

    return { message: 'Research updated!' }
  }

  async findAll(token: string) {
    const decodedToken = this.decodeToken(token);

    const researchs = await this.researchRepository.find({ where: { idCompany: decodedToken.company }});

    return researchs;
  }

  async duplicate(id: number) {
    const research:any = await this.researchRepository.find({ select: ['id', 'subtitle', 'desc', 'title', 'idCompany', 'idUser', 'status'], where: { id }});
  
    await Promise.all(research.map(async (research: Research) => {
      research.sections = await this.questionsSectionsService.findAllCustom(research.id) 

      research.id = undefined;

      await Promise.all(research.sections.map(async (section: QuestionSections) => {
        section.questions = await this.questionsService.findAllCustom(section.id);
  
        section.id = undefined;

        await Promise.all(section.questions.map(async (question: Question) => {
          question.alternatives = await this.questionsAlternativesService.findAllCustom(question.id);

          question.id = undefined;

          question.alternatives.map((item) => item.id = undefined);
        }));
      }));
    })) 

    const { 
      subtitle,
      desc,
      title,
      idCompany,
      idUser,
      status
    } = research[0];

    const infosUpdate = {
      subtitle,
      desc,
      title,
      idCompany,
      idUser,
      status
    }

    const newResearch = await this.researchRepository.save(infosUpdate);
    
    research[0].sections.map((item: QuestionSections) => {
      item.idResearch = newResearch.id
    });

    await this.questionsSectionsService.create(research[0].sections)

    return { message: 'Research duplicated!' };
  }

  async myResearch(token: string) {
    const decodedToken = this.decodeToken(token);

    const researchs = await this.researchRepository.find({ where: { idUser: decodedToken.id }});

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

    decodeToken(token: string) {
      return jwt.verify(token, '7ccd7835da99ef1dbbce76128d3ae0e7')
    }
}
