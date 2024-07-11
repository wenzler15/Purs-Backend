import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './models/role.entity';
import { Role } from './models/role.interface';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly companyService: CompaniesService
  ) { }

  async create(createRoleDto: Role, token: string) {
    const decodedToken = await this.companyService.decodeToken(token);

    createRoleDto.idCompany = decodedToken.company;

    const role = await this.roleRepository.save(createRoleDto);

    return { message: 'Role created!', role }
  }

  async findAll(token: string) {
    const decodedToken = await this.companyService.decodeToken(token);

    const roles = await this.roleRepository.find({ where: { idCompany: decodedToken.company }});

    return roles;
  }

  async findOne(id: number, token: string) {
    const decodedToken = await this.companyService.decodeToken(token);

    const role = await this.roleRepository.findOne({ where: { id } });

    if(role.idCompany !== decodedToken.company) throw new HttpException('User unauthorized!', HttpStatus.UNAUTHORIZED);

    if (!role) throw new HttpException("Role didn't exists!", HttpStatus.BAD_REQUEST);

    return role;
  }

  async update(id: number, updateRoleDto: Role, token: string) {
    const decodedToken = await this.companyService.decodeToken(token);

    const role = await this.roleRepository.findOne({ where: { id } });

    if(role.idCompany !== decodedToken.company) throw new HttpException('User unauthorized!', HttpStatus.UNAUTHORIZED);

    if (!role) throw new HttpException("Role didn't exists!", HttpStatus.BAD_REQUEST);

    const roleUpdated = await this.roleRepository.save({
      ...role,
      ...updateRoleDto,
    })

    return { message: 'Role updated!', role: roleUpdated };
  }

  async remove(id: number, token: string) {
    const decodedToken = await this.companyService.decodeToken(token);

    const role = await this.roleRepository.findOne({ where: { id } });

    if(role.idCompany !== decodedToken.company) throw new HttpException('User unauthorized!', HttpStatus.UNAUTHORIZED);

    if (!role) throw new HttpException("Role didn't exists!", HttpStatus.BAD_REQUEST);

    return { message: 'Role deleted!', role: this.roleRepository.delete(id) }
  }
}
