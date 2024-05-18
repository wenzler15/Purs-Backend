import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResearchResponse } from './models/research-response.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ResearchResponseEntity } from './models/research-response.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResearchResponseService {
  constructor(
    @InjectRepository(ResearchResponseEntity)
    private readonly researchResponseRepository: Repository<ResearchResponseEntity>,
  ) { }

  async create(createResearchResponseDto: ResearchResponse) {
    const researchResponse = await this.researchResponseRepository.save(createResearchResponseDto);

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
}
