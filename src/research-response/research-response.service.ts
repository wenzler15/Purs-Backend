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
    const researchResponses = await this.researchResponseRepository.find({ where: { userId , researchId } });

    if (!researchResponses) throw new HttpException("researchResponses didn't exists!", HttpStatus.BAD_REQUEST);

    return researchResponses;
  }

  async findResponsesGraph(researchId: number) {
    const researchResponses = await this.researchResponseRepository.find({ select: ['id', 'questionId', 'answer'], where: { researchId } });

    if (!researchResponses) throw new HttpException("researchResponses didn't exists!", HttpStatus.BAD_REQUEST);

    return researchResponses;
  }

  async findResponsesByQuestion(researchId: number, questionId: number) {
    const researchResponses = await this.researchResponseRepository.find({select: ['answer'], where: { researchId, questionId } });

    if (!researchResponses) throw new HttpException("researchResponses didn't exists!", HttpStatus.BAD_REQUEST);

    const converted = this.countWords(researchResponses);

    return converted;
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

  countWords(data) {
    const wordCount = {};

    const monosyllabicWords = new Set(["a", "e", "de", "do", "da", "ou"]);

    data.forEach(item => {
        // Separar a resposta em palavras
        const words = item.answer.split(/\s+/);

        words.forEach(word => {
            // Remover caracteres especiais e converter para minúsculas
            const cleanedWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();

            // Verificar se a palavra tem mais de 3 letras e não está na lista de palavras monossílabas
            if (cleanedWord.length > 3 && !monosyllabicWords.has(cleanedWord)) {
                // Contar as ocorrências da palavra
                if (!wordCount[cleanedWord]) {
                    wordCount[cleanedWord] = 0;
                }
                wordCount[cleanedWord]++;
            }
        });
    });

    // Converter o objeto de contagem para o formato desejado
    const wordsArray = Object.keys(wordCount).map(word => ({
        text: word.charAt(0).toUpperCase() + word.slice(1), // Capitalize a primeira letra
        value: wordCount[word]
    }));

    return wordsArray;
}
}
