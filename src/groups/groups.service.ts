import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Group } from './models/group.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from './models/group.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
const jwt = require('jsonwebtoken');
@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>
  ) { }

  async create(createGroupDto: Group, token: string) {
    const decodedToken = await this.decodeToken(token);

    createGroupDto.idCompany = decodedToken.company;

    const group = await this.groupRepository.save(createGroupDto);

    return { message: 'Group created!', group }
  }

  async findAll(token: string) {
    const decodedToken = await this.decodeToken(token);

    const groups = await this.groupRepository.find({ where: { idCompany : decodedToken.company } });

    return groups;
  }

  async findOne(id: number, token: string) {
    const decodedToken = await this.decodeToken(token);

    const group = await this.groupRepository.findOne({ where: { id } });

    if(group.idCompany !== decodedToken.company) throw new HttpException('User unauthorized!', HttpStatus.UNAUTHORIZED);

    return group;
  }

  async update(id: number, updateGroupDto: Group, token: string) {
    const decodedToken = this.decodeToken(token)

    const group = await this.groupRepository.findOne({ where: { id } });

    if (!group) throw new HttpException("Group didn't exists!", HttpStatus.BAD_REQUEST);

    if (group.idCompany !== decodedToken.company) throw new HttpException('User unauthorized!', HttpStatus.UNAUTHORIZED);

    const groupUpdated = await this.groupRepository.save({
      ...group,
      ...updateGroupDto,
    });

    return { message: 'Group updated', group: groupUpdated };
  }

  async remove(id: number, token: string) {
    const decodedToken = this.decodeToken(token)

    const group = await this.groupRepository.findOne({ where: { id } });

    if (decodedToken.company != group.idCompany) {
      throw new HttpException('User unauthorized!', HttpStatus.UNAUTHORIZED)    
    }

    if (!group) throw new HttpException("Company didn't exists!", HttpStatus.BAD_REQUEST);

    return { message: "Group deleted!", company: this.groupRepository.delete(id) };
  }

  decodeToken(token: string) {
    return jwt.verify(token, '7ccd7835da99ef1dbbce76128d3ae0e7')
  }
}
