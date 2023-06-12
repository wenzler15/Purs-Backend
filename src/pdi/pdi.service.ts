import { Injectable } from '@nestjs/common';
import { PdiEntity } from './models/pdi.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { UserEntity } from 'src/users/models/users.entity';
import { log } from 'console';
const jwt = require('jsonwebtoken');

@Injectable()
export class PdiService {
  constructor(
    @InjectRepository(PdiEntity)
    private readonly pdiRepository: Repository<PdiEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async create(createPdiDto: PdiEntity, token: string) {
    const user = await this.decodeToken(token);

    createPdiDto.owner = user.id;
    createPdiDto.companyOwner = user.company;

    this.pdiRepository.save(createPdiDto);

    return { message: 'PDI created!' };
  }

  async findAll(token: string) {
    const user = await this.decodeToken(token);

    const pdis = await this.pdiRepository.find({
      where: {
        companyOwner: user.company
      }
    });

    pdis.map((pdi: PdiEntity) => {
      pdi.companyOwner = undefined;
      pdi.owner = undefined;
    });

    return pdis;
  }

  async findOne(id: number, token: string) {
    try {
      const user = await this.decodeToken(token);

      const pdi: PdiEntity = await this.pdiRepository.findOne({ where: { companyOwner: user.company, id } });

      pdi.companyOwner = undefined;

      return pdi;
    } catch (err) {
      return { message: "PDI not found!" }
    }
  }

  async update(id: number, updatePdiDto: PdiEntity, token: string) {
    const user = await this.decodeToken(token);

    const pdi: PdiEntity = await this.pdiRepository.findOne({
      where: { companyOwner: user.company, id },
    });

    if (pdi.owner != user.id) {
      throw new HttpException(
        "You don't have permission!",
        HttpStatus.FORBIDDEN,
      );
    }

    const pdiuUpdate: PdiEntity = await this.pdiRepository.save({
      ...pdi,
      ...updatePdiDto,
    });

    pdiuUpdate.companyOwner = undefined;
    pdiuUpdate.owner = undefined;

    return { message: "Pdi updated!", pdiuUpdate }
  }

  async remove(id: number, token: string) {
    const user = await this.decodeToken(token);

    const pdi: PdiEntity = await this.pdiRepository.findOne({
      where: { companyOwner: user.company, id },
    });

    if (pdi.owner != user.id) {
      throw new HttpException(
        "You don't have permission!",
        HttpStatus.FORBIDDEN,
      );
    }

    return { message: 'PDI deleted!', user: this.pdiRepository.delete(id) };
  }

  async getMyPDI(token: string) {
    const user = await this.decodeToken(token);

    const pdis: PdiEntity[] = await this.pdiRepository.find({
      where: {
        companyOwner: user.company,
        owner: user.id
      }
    });

    pdis.map((pdi: PdiEntity) => {
      pdi.companyOwner = undefined;
      pdi.owner = undefined;
    });

    return pdis;
  }

  async getMyTeamPDI(token: string) {
    const user = await this.decodeToken(token);

    const users = await this.userRepository.find({
      where: {
        idLeader: user.id
      }
    });

    const arrayIds = [];

    users.map((user) => {
      arrayIds.push(user.id)
    });

    const pdis: PdiEntity[] = await this.pdiRepository.find({
      where: {
        companyOwner: user.company,
        id: In([...arrayIds])
      }
    });

    pdis.map((pdi: PdiEntity) => {
      pdi.companyOwner = undefined;
      pdi.owner = undefined;
    });

    return pdis;
  }

  decodeToken(token: string) {
    return jwt.verify(token, '7ccd7835da99ef1dbbce76128d3ae0e7')
  }
}
