import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Research } from './models/research.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResearchEntity } from './models/research.entity';

@Injectable()
export class ResearchService {
  constructor(
    @InjectRepository(ResearchEntity)
    private readonly researchRepository: Repository<ResearchEntity>,
  ) { }

  async create(createResearchDto: Research) {
    return 'This action adds a new research';
  }

  async findAll(idCompany: number) {
    const researchs = await this.researchRepository.find({ where: { idCompany }});

    return researchs;
  }

  async myResearch(idUser: number) {
    const researchs = await this.researchRepository.find({ where: { idUser }});

    return researchs;
  }

  async findOne(id: number) {
    const research = await this.researchRepository.findOne({ where: { id } });

    if (!research) throw new HttpException("Research didn't exists!", HttpStatus.BAD_REQUEST);

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
