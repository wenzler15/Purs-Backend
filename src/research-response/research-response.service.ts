import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResearchResponse } from './models/research-response.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ResearchResponseEntity } from './models/research-response.entity';
import { Repository } from 'typeorm';
import { SurveyResponseStatusEntity } from './models/survey-response-status.entity';
import { ResearchEntity } from 'src/research/models/research.entity';

@Injectable()
export class ResearchResponseService {
  constructor(
    @InjectRepository(ResearchResponseEntity)
    private readonly researchResponseRepository: Repository<ResearchResponseEntity>,
    @InjectRepository(SurveyResponseStatusEntity)
    private readonly surveyResponseRepository: Repository<SurveyResponseStatusEntity>,
    @InjectRepository(ResearchEntity)
    private readonly researchRepository: Repository<ResearchEntity>,
  ) { }

  async create(createResearchResponseDto: ResearchResponse[]) {
    const researchResponse = await this.researchResponseRepository.save(createResearchResponseDto);

    createResearchResponseDto.map(async (item: ResearchResponse) => {
      const {researchId, userId} = item;
  
      const survey = {
        researchId,
        userId,
        responded: true
      }
  
      await this.surveyResponseRepository.save(survey);
    })

    return { message: 'Response salved!', researchResponse }
  }

  async findResponses(userId: number, researchId: number) {
    const researchResponses = await this.researchResponseRepository.findOne({ where: { userId , researchId } });

    if (!researchResponses) throw new HttpException("researchResponses didn't exists!", HttpStatus.BAD_REQUEST);

    return researchResponses;
  }

  async update(id: number, updateResearchResponseDto: ResearchResponse) {
    const response = await this.researchResponseRepository.findOne({ where: { id } });

    if (!response) throw new HttpException("response didn't exists!", HttpStatus.BAD_REQUEST);

    const responseUpdated = await this.researchResponseRepository.save({
      ...response,
      ...updateResearchResponseDto,
    })

    return { message: 'Response updated!', role: responseUpdated };
  }

  async findSurveys(userId: number, companyId: number) {
    const companyResearchs = await this.researchRepository.find({where: {idCompany: companyId}});

    const userSurveys = await this.surveyResponseRepository.find({where: { userId}});

    // Mapeia as pesquisas para um objeto com o id como chave
    const researchMap = companyResearchs.reduce((map, research) => {
      map[research.id] = { ...research, userSurveys: [] };
      return map;
  }, {});
  
  // Adiciona as respostas de pesquisa ao respectivo objeto de pesquisa
  userSurveys.forEach(survey => {
      if (researchMap[survey.researchId]) {
          researchMap[survey.researchId].userSurveys.push(survey);
      }
  });
  
  // Converte o objeto de volta para um array
  const mergedArray = Object.values(researchMap);

  return mergedArray
  }
}
